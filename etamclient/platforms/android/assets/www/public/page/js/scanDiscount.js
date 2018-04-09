/**
 * Created by Administrator on 2017/1/10.
 */
/**
 * Created by Administrator on 2017/1/7.
 */
const page = {
    productPanel : $('#productPanel'),
    sizePanel : $('#sizePanel'),
    inventoryPanel : $('#inventoryPanel'),
    inventoryTablePanel : $('#inventoryTablePanel'),
    inventoryTable : $('#inventoryTable'),
    scanButton : $('#scan'),

    url : {
        product : "/customer/list",//TODO 发生ajax请求数据  url
    },

    mockData : {
        product : {
            img: "/page/images/cloth1.png",
            sku: "1603 28183 3840",
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
        },
        size : [{
            code : "S",
            title : "S"
        },{
            code : "M",
            title : "M"
        },{
            code : "L",
            title : "L"
        },{
            code : "XL",
            title : "XL"
        },{
            code : "XXL",
            title : "XXL"
        },{
            code : "XXL2",
            title : "XXL2"
        },{
            code : "XXL3",
            title : "XXL3"
        }
        ],
        inventory : [{
            color : "红色",
            S : "17/1/1",
            M : "17/1/1",
            L: '17/1/1',
            XL: '17/1/1'
        },{
            color : "蓝色",
            S: '17/1/2',
            M: '17/1/2',
            L: '17/1/2'
            // , XL: '17/1/2'
        },{
            color : "黄色",
            S: '17/1/3',
            M: '17/1/3',
            L: '17/1/3',
            XL: '17/1/3'
        },{
            color : "黑色",
            S: '17/1/4',
            M: '17/1/4',
            L: '17/1/4',
            XL: '17/1/4',
            XXL:'17/1/4'
        }]
    }
};

page.init = function () {
    page.initElement();
    page.initEvent();
};

page.initElement = function () {
    const thisPage = this;

};
page.initEvent = function () {
    const thisPage = this;

    thisPage.scanButton.click(function () {
        //TODO 调wechat扫描接口，并发送ajax请求数据
        var data = thisPage.mockData;

        thisPage.inventoryTablePanel.show();
        thisPage.renderProductInfo(data.product);//产品info
    });
};

page.renderProductInfo = function (product) {
    const thisPage = this;

    thisPage.productPanel.empty();

    var tr, td;
    var link = $('<a>').attr({
        "href" : "javascript:void(0);",
        "class" : "weui_media_box weui_media_appmsg"
    }).appendTo(thisPage.productPanel);

    var img = $('<div>').addClass('weui_media_hd').appendTo(link);
    $('<img>').addClass("weui_media_appmsg_thumb").attr("src", product.img).appendTo(img);
    var imgInfo='<div id="aa"><span>'
        + product.brand
        + '</span></div><div id="aa">'
        + product.sku
        + '</div><div id="aa"><span class="margin-left"> '
        + product.color+product.color_size + '</span><span>'
        +I18N["common.product.price"]
        + product.tag_price + '</span></div>'
        +'<div id="aa">'
        +'<span class="margin-left" >'+product.cur_discount
        +'</span>'
        +'<span class="margin-left">'
        +I18N["common.product.price"]
        +product.discount_price
        +'</span>'
        +'<span>['
        +product.inventory
        +']</span>'
        +'</div>';
    var pb = $.photoBrowser({
        items: [
            {
                image:  product.img,
                caption: imgInfo
            }
            // product.img,
            // caption:""
        ]
    });
    img.click(function () {
        pb.open();
    });

    var info = $('<div>').addClass('weui_media_bd').appendTo(link);
    var table = $('<table>').addClass('guide-product-info').appendTo(info);
    var tHead = $('<thead>').appendTo(table);

    tr = $('<tr>').appendTo(tHead);
    $('<td>').html(I18N["common.SKU"]).append(product.sku).appendTo(tr);

    var tBody = $('<tbody>').appendTo(table);

    tr = $('<tr>').appendTo(tBody);
    $('<td>').html(I18N["common.product.brand"]).append(product.brand).appendTo(tr);

    tr = $('<tr>').appendTo(tBody);
    $('<td>').html(I18N["common.product.season"]).append(product.season).appendTo(tr);

    tr = $('<tr>').appendTo(tBody);
    $('<td>').html(I18N["common.product.name"]).append(product.name).appendTo(tr);

    tr=$('<tr>').appendTo(tBody);
    td=$('<td>').append(product.color).appendTo(tr);
    $('<span class="margin-left">').html(product.color_size).appendTo(td);
    $('<span>').html(I18N["common.product.price"]+product.tag_price).appendTo(td);

    tr = $('<tr>').appendTo(tBody);
    td = $('<td>').html(I18N["common.product.lastDiscount"]).appendTo(tr);
    $('<span>').html(product.last_discount).appendTo(td);

    tr = $('<tr>').appendTo(tBody);
    td = $('<td class="cur-count-style">').html(I18N["common.product.curDiscount"]).appendTo(tr);
    $('<span class="margin-left">').html(product.cur_discount).appendTo(td);
    $('<span class="margin-left">').html(I18N["common.product.price"]+product.discount_price).appendTo(td);
    $('<span>').html('['+product.inventory+']').appendTo(td);
};

$(function () {
    page.init();
});