/**
 * Created by Administrator on 2017/1/6.
 */
'use strict';//这样声明表严格模式
const page = {
    leftTabPanel: $('#leftTab'),
    topTabPanel: $('#topTab'),
    productListPanel: $('#productList'),
    discountListItems: $('#discountListItems'),
    total: $('#discount-list-total'),
    _pageNumber: 1,//当前页数【默认显示第一页】
    _pageSize: 10,//每页显示的条数
    _total: 36,
    _loadingFlag: true,

    url: {
        condition: "",//TODO 添加condition请求url
        productList: ""//TODO 发送ajax 请求 productList url
    },

    mockData: {
        condition: [{
            code: 'Initial',
            title: '原价',
            value: '100',
            children:[]
        }, {
            code: 'seven',
            title: '7折',
            value: '70',
            children:[]
        }, {
            code: 'five',
            title: '5折',
            value: '50',
            children:[]
        }, {
            code: 'three',
            title: '3折',
            value: '30',
            children:[]
        }],
        productList: []
    }
};

page.init = function () {//页面初始化
    page.initElement();//初始化所有页面
    page.initEvent();//初始化所有的页面事件
};

page.initElement = function () {
    this.renderLeftTab();
};
//监听鼠标滚动事件

page.switchTab = function (el) {
    let val = $(el).attr('value');
    if (val.indexOf('a') > -1) {
        window.location.href = '/view/discountList?storeNo=' + $("#storeNoDiv").data('code') + '&from=' + val.substring(1) + '&to=' + $("#topTab").find('.active').attr('value').substring(1);
    } else {
        window.location.href = '/view/discountList?storeNo=' + $("#storeNoDiv").data('code') + '&from=' + $("#leftTab").find('.active').attr('value').substring(1) + '&to=' + val.substring(1);
    }
};

page.initEvent = function () {
};

//渲染左边页卡
page.renderLeftTab = function () {
    const thisPage = this;
    let data = thisPage.mockData.condition, div,
        myFrom = $("#storeNoDiv").data('from'), myto = $("#storeNoDiv").data('to');
//=============遍历左侧页卡数据 ，除自身以外的数据放在其children属性中，
    data.forEach(function (c) {
        if (c.value != myto) {
            c.children = [];
            data.forEach(function (cc) {
                if (cc.value != myFrom) {
                    c.children.push(cc);
                }
            });
            div = $('<div>').appendTo(thisPage.leftTabPanel);
            $('<div class="swtchtag discountList-left-in-div a' + c.value + '">').attr('value', 'a' + c.value).html("<span>"+I18N["discountList.from"]  + c.title + "</span>").appendTo(div);
            thisPage.renderTopTab(c);
        }
    });

    $(".swtchtag").click(function () {
        thisPage.switchTab(this);
    });
};
//渲染头部页卡
page.renderTopTab = function (data) {
    const thisPage = this;

    //清空已有顶部页卡
    thisPage.topTabPanel.empty();
    // 遍历当前左侧页卡的children属性 cc.title
    data.children.forEach(function (cc) {
        //渲染顶部页卡
        $('<td class="swtchtag top-td b' + cc.value + '">').attr('value', 'b' + cc.value).html(I18N["discountList.to"] + cc.title).appendTo(thisPage.topTabPanel);
    });
    //默认选中第一个
    // thisPage.topTabPanel.children().eq(0).click();
//      $("#cbutton1").bind("click",{"id":"111","name":"aaa"},getData);
//    thisPage.topTabPanel.children().eq(0).bind("click",{"pageSize":"10","pageNumber":"1"},clickName)
};
//渲染产品信息list
page.renderProductList = function (from, to) {
    //TODO 根据from和to通过 ajax 请求 product 数据
//请求参数 thisPage._pageSize[当前页数] thisPage._pageNumber【每次返回的数据个数】 from 【left页卡code】to【top页卡code】
// 返回数据 ： _total 【数据长度】  productList【产品信息集】

    const thisPage = this;
    let data = thisPage.mockData.productList,
        totalNum = thisPage._total,
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
            + product.color + product.color_size + '</span><span>'+I18N["common.product.price"]
            + product.tag_price + '</span></div>'
            + '<div id="aa">'
            + '<span class="margin-left" >' + product.cur_discount
            + '</span>'
            + '<span class="margin-left">'+I18N["common.product.price"]
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