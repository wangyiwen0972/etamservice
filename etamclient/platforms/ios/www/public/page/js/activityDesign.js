/**
 * Created by Administrator on 2017/1/19.
 */
'use strict';
const page = {
    productListPanel : $('#productList'),
    discountListItems : $('#discountListItems'),
    total:$('#discount-list-total'),
    _pageNumber:1,//当前页数【默认显示第一页】
    _pageSize:10,//每页显示的条数
    _total:36,
    _loadingFlag:true,

    url : {
        condition : "",//TODO 添加condition请求url
        productList:""//TODO 发送ajax 请求 productList url
    },

    mockData : {
        condition : [{
            code : 'Initial',
            title : '原价'
        },{
            code : 'seven',
            title : '7折'
        },{
            code : 'five',
            title : '5折'
        },{
            code : 'three',
            title : '3折'
        }],

        productList : [{
            img: "/page/images/cloth1.png",
            sku: "1603 28183 40",
            name: "体恤衫",
            brand: "ES",
            season:"春秋",
            tag_price: "1000",
            cur_discount: "7折",
            discount_price: "1200",
            last_discount: "6折",
            color:"白色",
            color_size:"30",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }, {
            img: "/page/images/cloth2.png",
            sku: "1603 28183 95",
            name: "裤子",
            brand: "ES",
            season:"春秋",
            tag_price: "1200",
            cur_discount: "7折",
            discount_price: "1000",
            last_discount: "6折",
            color:"黑色",
            color_size:"03",
            inventory:60,
            size:'M'
        }]
    }
};

page.init = function () {//页面初始化
    page.initElement();//初始化所有页面
    page.initEvent();//初始化所有的页面事件
};

page.initElement = function () {
    //取传过来的参数
    function GetQueryString(name) { //这是自己封装的取值的方法
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = decodeURI(window.location.search).substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    //下面是通过封装的方法取并运用传过来的参数：
    var alertListTitle=GetQueryString('alertListTitle');
    $('.activeDesign').html(I18N["activityDesignNowActivity"]+alertListTitle);

    this.renderProductList();
};
//监听鼠标滚动事件

page.initEvent = function () {
    const thisPage = this;
//    滚动条监听事件

    thisPage.discountListItems.on('scroll', function (event) {
        let infoNum=(thisPage._total)*1 - thisPage._pageNumber * thisPage._pageSize;//剩余库存
        let panelHeight = thisPage.discountListItems.height(),//框高度
            panelScrollTop = thisPage.discountListItems.scrollTop(),//
            contentHeight = thisPage.productListPanel.height();//
        if(thisPage._loadingFlag && contentHeight - (panelHeight + panelScrollTop) < 90 && infoNum > 0){
            thisPage._loadingFlag = false;
            $('#loading').show();
            setTimeout(function () {
                $('#loading').hide();
                thisPage._pageNumber++;
                thisPage.renderProductList();//重新调用渲染列表方法
                thisPage._loadingFlag = true;
            },2000);
        }
    });
};
//渲染产品信息list
page.renderProductList = function () {
    //TODO 发送ajax 请求 活动款式数据 即 product 数据
// 返回数据 ： _total 【数据长度】  productList【产品信息集】

    const thisPage = this;
    let data = thisPage.mockData.productList,
        totalNum=thisPage._total,
        tr, td;
    thisPage.total.html(totalNum);

    data.forEach(function (product) {
        let link = $('<a>').attr({
            "href": "javascript:void(0);",
            "class": "weui_media_box weui_media_appmsg productListPanel_a"
        }).appendTo(thisPage.productListPanel);

        let img = $('<div>').addClass('weui_media_hd').appendTo(link);
        $('<img>').addClass("weui_media_appmsg_thumb").attr("src", product.img).appendTo(img);
        let imgInfo = '<div id="aa"><span>'
            + product.brand
            + '</span></div><div id="aa">'
            + product.sku
            + '</div><div id="aa"><span class="margin-left"> '
            + product.color + product.color_size + '</span><span>'+I18N["common.money.logo"]
            + product.tag_price + '</span></div>'
            + '<div id="aa">'
            + '<span class="margin-left" >' + product.cur_discount
            + '</span>'
            + '<span class="margin-left">'
            + product.discount_price
            + '</span>'
            + '<span>['
            + product.inventory
            + ']</span>'
            + '</div>';
        let pb = $.photoBrowser({

            items: [
                {
                    image: product.img,
                    caption: imgInfo
                }
            ]
        });
        img.click(function () {
            pb.open();
            $(this).removeClass('active');
        });

        let info = $('<div>').addClass('weui_media_bd').appendTo(link);
        let table = $('<table>').addClass('guide-product-info').appendTo(info);
        let tHead = $('<thead>').appendTo(table);

        tr = $('<tr>').appendTo(tHead);
        $('<td>').html(I18N["common.SKU"]).append(product.sku).appendTo(tr);

        let tBody = $('<tbody>').appendTo(table);

        tr = $('<tr>').appendTo(tBody);
        $('<td>').html(I18N["common.product.brand"]).append(product.brand).appendTo(tr);

        tr = $('<tr>').appendTo(tBody);
        $('<td>').html(I18N["common.product.season"]).append(product.season).appendTo(tr);

        tr = $('<tr>').appendTo(tBody);
        $('<td>').html(I18N["common.product.name"]).append(product.name).appendTo(tr);

        tr = $('<tr>').appendTo(tBody);
        td = $('<td>').append(product.color).appendTo(tr);
        $('<span class="margin-left">').html(product.color_size).appendTo(td);
        $('<span>').html(I18N["common.product.price"] + product.tag_price).appendTo(td);

        tr = $('<tr>').appendTo(tBody);
        td = $('<td>').html(I18N["common.product.lastDiscount"]).appendTo(tr);
        $('<span>').html(product.last_discount).appendTo(td);

        tr = $('<tr>').appendTo(tBody);
        td = $('<td style="color: #E80076;">').html(I18N["common.product.curDiscount"]).appendTo(tr);
        $('<span class="margin-left">').html(product.cur_discount).appendTo(td);
        $('<span class="margin-left">').html(I18N["common.money.logo"] + product.discount_price).appendTo(td);
        $('<span>').html('[' + product.inventory + ']').appendTo(td);

    });

};

$(function () {//====================调用页面初始化
    // page.init();
});