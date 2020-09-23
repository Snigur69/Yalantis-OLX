export const convertUrlToParams = (url) => {
    let request = url.replace("?", "");
    let requestOptions = request.split("&").reduce(function (p, e) {
        var a = e.split("=");
        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
    }, {});
    return requestOptions;
};
