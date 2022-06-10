const express = require('express');
const {constProxyMiddleWare,createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app){
    // app.use(
    //     createProxyMiddleware({
    //         pathFilter:'**',
    //         target:'http://localhost:8080/website',
    //         changeOrigin: true
    //     })
    // );   
 app.use(
     '/openAccount',
     createProxyMiddleware({
         target:'http://localhost:8080/website',
         changeOrigin: true
     })
 );
 app.use(
    '/admin/*',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
 app.use(
    '/changePassword',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
 app.use(
    '/login',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/transactions',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/availableCustomers',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/checkPassword',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/transfer',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/count',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/validation',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/transactionDetails',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/new',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/checkTransactions',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
app.use(
    '/allUsers',
    createProxyMiddleware({
        target:'http://localhost:8080/website',
        changeOrigin: true
    })
);
    // app.use(
    //     '/**',
    //     createProxyMiddleware({
    //         target:'http://localhost:8080/website',
    //         changeOrigin: true
    //     })
    // );
}

