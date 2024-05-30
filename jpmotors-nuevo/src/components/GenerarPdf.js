// import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

const GenerarPdf = async (modalRef) => {
    try {
        // Opciones de configuración para html2pdf
        const options = {
            margin: [20, 20, 20, 20], 
            filename: 'vehiculo.pdf',
            image: { type: 'png', quality: 0.5 },
            html2canvas: { scale: 2, logging: true, dpi: 100, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } ,
            pagebreak: { mode: ['avoid-all'] }, // Evitar saltos de página innecesarios
            html2pdf: { fonts: [{ src: 'path/to/font.ttf', family: 'FontName' }] } // Si se usan fuentes personalizadas, incluirlas aquí
        };
        

        // Convierte el contenido del modalRef a PDF
        await html2pdf().set(options).from(modalRef).save();
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

export default GenerarPdf;
