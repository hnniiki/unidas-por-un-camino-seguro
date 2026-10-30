import jsPDF from 'jspdf';
import { EducationalInfographic } from '../types/citizenMap';

export const exportInfographicToPDF = (infographic: EducationalInfographic) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner Background
  doc.setFillColor(75, 46, 79); // #4B2E4F Brand Plum
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Decorative Sub-header bar
  doc.setFillColor(165, 141, 181); // #A58DB5
  doc.rect(0, 42, pageWidth, 4, 'F');

  // Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('UNIDAS POR UN CAMINO SEGURO', margin, 16);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Plataforma Integral de Prevención del Embarazo Adolescente & Bienestar', margin, 24);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(230, 220, 242);
  doc.text(`Categoría: ${infographic.categoryLabel.toUpperCase()} | Fuente: ${infographic.authoritativeSource}`, margin, 34);

  let currentY = 56;

  // Main Infographic Title
  doc.setTextColor(59, 31, 61);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const splitTitle = doc.splitTextToSize(infographic.title, contentWidth);
  doc.text(splitTitle, margin, currentY);
  currentY += splitTitle.length * 6 + 4;

  // Description / Subtitle
  doc.setTextColor(90, 70, 95);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const splitDesc = doc.splitTextToSize(infographic.description, contentWidth);
  doc.text(splitDesc, margin, currentY);
  currentY += splitDesc.length * 5 + 6;

  // Key Protocol Box (Highlight)
  doc.setFillColor(253, 242, 248); // soft pink/purple
  doc.setDrawColor(225, 29, 72); // rose border
  doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3, 'FD');

  doc.setTextColor(190, 18, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('🚨 REGLA DE ORO / PROTOCOLO CRÍTICO:', margin + 4, currentY + 7);

  doc.setTextColor(75, 46, 79);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const splitProto = doc.splitTextToSize(infographic.keyProtocol, contentWidth - 8);
  doc.text(splitProto, margin + 4, currentY + 13);
  currentY += 26;

  // Key Bullet Points Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(75, 46, 79);
  doc.text('Puntos Fundamentales que debes saber:', margin, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(50, 40, 55);

  infographic.bulletPoints.forEach((point) => {
    const bulletText = `•  ${point}`;
    const splitPoint = doc.splitTextToSize(bulletText, contentWidth - 4);
    doc.text(splitPoint, margin + 2, currentY);
    currentY += splitPoint.length * 4.8 + 2;
  });

  currentY += 4;

  // Step-by-Step Action Guide
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(75, 46, 79);
  doc.text('Paso a Paso de Actuación Inmediata:', margin, currentY);
  currentY += 6;

  infographic.steps.forEach((step) => {
    if (currentY > 255) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFillColor(245, 243, 247);
    doc.roundedRect(margin, currentY, contentWidth, 18, 2, 2, 'F');

    // Number circle badge
    doc.setFillColor(75, 46, 79);
    doc.circle(margin + 6, currentY + 9, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(`${step.number}`, margin + 5, currentY + 10.5);

    // Title
    doc.setTextColor(75, 46, 79);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(step.title, margin + 14, currentY + 6);

    // Description & Tip
    doc.setTextColor(70, 60, 75);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const splitStepDesc = doc.splitTextToSize(`${step.description} (Consejo: ${step.tip})`, contentWidth - 18);
    doc.text(splitStepDesc, margin + 14, currentY + 11);

    currentY += 21;
  });

  // Emergency Hotlines Footer Box
  currentY = Math.max(currentY + 2, 260);
  doc.setFillColor(75, 46, 79);
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('📞 CANALES OFICIALES DE ATENCIÓN GRATUITA 24/7 (PERÚ):', margin + 4, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(240, 235, 245);
  doc.text('• Línea 100 (MIMP) - Violencia Familiar y Sexual (24h confidencial)', margin + 4, currentY + 13);
  doc.text('• Línea 113 Salud Opción 3 (MINSA) - Salud Sexual & Anticoncepción | SíseVe: 0800-76-888', margin + 4, currentY + 18);

  // Save the PDF
  doc.save(infographic.downloadFilename || 'Guia_Prevencion_Unidas.pdf');
};
