import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun
} from 'docx';

export async function downloadMaterial(
  source: HTMLElement,
  name: string,
  format: 'pdf' | 'docx'
) {
  const filename = name.replace(/[<>:"/\\|?*]/g, '-');

  if (format === 'docx') {
    const paragraphs = source.innerText.split('\n').map(
      line => new Paragraph({
        children: [new TextRun(line)],
        spacing: { after: 120 }
      })
    );

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            text: source.dataset.title || 'Sahayak',
            heading: HeadingLevel.TITLE
          }),
          ...paragraphs
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.docx`;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 10000);
    return;
  }

  const { default: html2pdf } = await import('html2pdf.js');

  const sheet = document.createElement('div');
  sheet.className = 'material-export';

  const heading = document.createElement('h1');
  heading.textContent = source.dataset.title || 'Sahayak';
  heading.style.cssText =
    'font-size:24px;font-weight:bold;margin-bottom:16px';

  sheet.append(heading, source.cloneNode(true));

  const options = {
    margin: [12, 12, 12, 12] as [number, number, number, number],
    filename: `${filename}.pdf`,
    html2canvas: {
      scale: 2,
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4',
      orientation: 'portrait' as const
    },
    pagebreak: {
      mode: ['css', 'legacy'],
      avoid: ['tr', 'h1', 'h2', 'h3']
    }
  };

  await html2pdf().set(options).from(sheet).save();
}
