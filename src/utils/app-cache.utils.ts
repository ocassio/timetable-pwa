export default class AppCacheUtils {

  static injectAppCache(manifestName: string): void {
    const iframe = document.createElement('iframe');
    const html = this.getPageTemplate(manifestName);
    iframe.src = `data:text/html;charset=utf-8,${encodeURI(html)}`;
    document.body.appendChild(iframe);
  }

  private static getPageTemplate(manifestName: string): string {
    return `
      <!doctype html>
      <html manifest="${manifestName}">
        <body></body>
      <html>
    `;
  }

}
