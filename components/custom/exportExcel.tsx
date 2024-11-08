'use client'
import React, { useEffect } from 'react';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from '../ui/button';
const myInputId = 'myInput';

interface PageProps {
  data: any[];
  columns: any[];
  workbookName: string;
  worksheetTitle: string[]
}

export default function ExportExcel(props: PageProps) {
  const workbook = new Excel.Workbook();
  useEffect(() => {

  }, [props.workbookName])

  const saveExcel = async () => {
    try {
      const myInput = document.getElementById(myInputId);
      //@ts-ignore
      const fileName = myInput.value || props.workbookName;

      for (let index = 0; index < props.worksheetTitle.length; index++) {
        const worksheet = workbook.addWorksheet(props.worksheetTitle[index]);
        worksheet.columns = props.columns[index];

        worksheet.getRow(1).font = { bold: true };

        worksheet.columns.forEach(column => {
          column.width = column.header.length + 5;
          column.alignment = { horizontal: 'center' };
        });

        //@ts-ignore
        props.data[index].forEach(singleData => {
          worksheet.addRow(singleData);
        });

        worksheet.eachRow({ includeEmpty: false }, row => {
          //@ts-ignore
          const currentCell = row._cells;

          //@ts-ignore
          currentCell.forEach(singleCell => {
            const cellAddress = singleCell._address;

            worksheet.getCell(cellAddress).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          });
        });

      }
      const buf = await workbook.xlsx.writeBuffer();

      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error('<<<ERRROR>>>', error);
    } finally {
      for (let index = 0; index < props.worksheetTitle.length; index++) {
        workbook.removeWorksheet(props.worksheetTitle[index]);

      }
    }
  };

  return (
    <>
      <style>
        {`
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            textAlign: center;
          }
           th, td { 
             padding: 4px;
           }
        `}
      </style>
      <div style={{ textAlign: 'center' }}>
        <div>
          Tên File: <input id={myInputId} defaultValue={props.workbookName} /> .xlsx
        </div>
        <div>
          <table style={{ margin: '0 auto' }}>
            <tbody>
              <tr>
                {props.columns[0].map(({ header }: { header: string }, i: number) => {
                  return <th key={i}>{header}</th>;
                })}
              </tr>

              {props.data[0].map((uniqueData: any) => {
                return (
                  <tr key={uniqueData.lastName}>
                    {Object.entries(uniqueData).map((eachData, index) => {
                      const value: string = eachData[1] ? eachData[1].toString() : "0";
                      return <td key={index}>{value}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='mt-4'>
            <Button variant='outline' className='bg-crusta text-white' onClick={saveExcel}>Export</Button>
          </div>

        </div>
      </div>
    </>
  );
}

