const getPagePath = () => {
    const basePath = window.location.host === 'blog.bengillett.com' ?
        'https://raw.githubusercontent.com/M3tanym/ben-blog/refs/heads/main/src/pages/' :
        window.location.protocol + '//' + window.location.hostname + ':8080/src/pages/';

    const pageName = window.location.pathname.substring(1);
    return [basePath, pageName];
};
export default getPagePath;