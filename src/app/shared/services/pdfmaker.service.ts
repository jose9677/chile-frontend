import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFronts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFronts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PDFMAKERService {

  constructor() { }

  createpdftables(titles:{},width:any[],bodys:any[]){
    const docDefinition = {
      content: [
        {
          toc: {
            title:titles
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: width,

            // body: [
            //   [ 'Usuario', 'Nombres y Apellidos', 'Rol', 'Aplicación','Módulo','Acción','Fecha' ],
            // ]
            body:bodys
          }
        }
      ]
    };
    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();

  }
  pdftext(paciente:any,rut:any,prevesion:any){
    const fecha = new Date();
    const Mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const docDefinition:any={
      content:[
        {  toc: {
            title:{text: 'Carta de Resguardo', style: 'header', alignment:'center', bold: true}
          }
        },
        {
          text:[{text: '\nSantiago, '+fecha.getDate()+' de '+Mes[fecha.getMonth()]+' del '+fecha.getFullYear()+'.\n', style: 'header', alignment:'right'},
          {text:'SEÑORES\n'},
          {text:'INTEGRAMÉDICA S.A.\n'},
          {text:'Y EXÁMENES DE LABORATORIO S.A.\n\n'},
          {text:'PRESENTE\n\n', decoration:'underline'},
          {text:'Por medio de la presente, y en representación de '},
          {text:'CORPORACIÓN DE DESARROLLO LA REINA', fontSize: 12, bold: true},
          {text:', Rol Único Tributario número 71.378.000-6, declaro lo siguiente:\n\n'},
          {text:'Que en razón del contrato de prestación de servicios suscrito entre mi representada e Integramédica S.A. y Exámenes de Laboratorio S.A., por la cual se acordó la realización de las prestaciones indicadas en la cláusula cuarta del Convenio vigente, respecto de los beneficiarios de la Corporación, de conformidad a los términos y condiciones contenidos en el referido instrumento, garantizo el pago a Integramédica S.A., según corresponda y en un plazo de 30 días corridos a la fecha de emisión de la respectiva factura.\n\n', alignment:'justify'},
          {text:'Paciente: '+paciente+'\n\n'},
          {text:'Rut: '+rut+'\n\n'},
          {text:'Tipo de previsión: '+prevesion+'\n\n\n'},
          {text: '___________________________________________\n', alignment:'center', bold: true},
          {text: 'Jose Luis León Marquéz\n', alignment:'center', bold: true},
          {text: '11.978.063-2\n\n', alignment:'center', bold: true},
        ],
        },
        {text:'NOTAS\n',style: 'header'},
        {ol:['Los cobros se ajustarán a lo acordado entre las partes según convenio vigente, según nómina.',]
      },

      ]
    }
    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
  }
}

//documentacion
//ejemplos
// pdfs(){
//   let title: {text: 'INDEX', style: 'header', alignment:'center'} aqui se pone el titulo
//   let widths: [ 'auto', 'auto', 'auto', 'auto','auto','auto','auto' ] aqui se le da el tammaño de la columnas
//   let array :any[]=[]
//   array.push([ 'Usuario', 'Nombres y Apellidos', 'Rol', 'Aplicación','Módulo','Acción','Fecha' ],['auto', 'auto', 'auto', 'auto','auto','auto','auto']) aqui se agrega el contenido de la tablas
//   this.pdf.createpdftables(title,widths,array) aqui llamas la funcion del pdf para generar la tabla

// }


