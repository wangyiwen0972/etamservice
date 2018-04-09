/**
 * Created by Administrator on 2017/1/7.
 */
const page = {
    productPanel : $('#productPanel'),
    sizePanel : $('#sizePanel'),
    inventoryPanel : $('#inventoryPanel'),
    inventoryTablePanel : $('#inventoryTablePanel'),
    saleTablePanel:$('#saleTablePanel'),
    salePanel:$('#salePanel'),
    inventoryTable : $('#inventoryTable'),
    inventoryTableThead:$('#inventoryTableThead'),
    scanButton : $('#scan'),
    commonQuery:$('.common-query'),
    commonQueryIndex:$('.common-query-index'),
    inventoryColorThead:$('#inventoryColorThead'),
    inventoryColorTbody:$('#inventoryColorTbody'),
    storeCodeInput: $('#sdCodeInput'),
    opCodeInput: $('#vCodeInput'),
    url : {
        product : "/customer/list",//TODO 发送ajax  请求url
    },
    _checkFlag:false,

    mockData : {
        product :{
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
            total:{
                store:68,
                online:4,
                way:4
            },
            S :{
                store:17,
                online:1,
                way:1
            },
            M :{
                store:17,
                online:1,
                way:1
            },
            L:{
                store:17,
                online:1,
                way:1
            },
            XL:{
                store:17,
                online:1,
                way:1
            }
        },{
            color : "蓝色",
            total:{
                total:51,
                online:3,
                way:6
            },
            S : {
                store:17,
                online:1,
                way:2
            },
            M :{
                store:17,
                online:1,
                way:2
            },
            L: {
                store:17,
                online:1,
                way:2
            }
        },{
            color : "黄色",
            total:{
                store:51,
                online:2,
                way:6
            },
            S : {
                store:17,
                online:1,
                way:3
            }
            ,
            M : {
                store:17,
                online:1,
                way:0
            },
            L: {
                store:17,
                online:0,
                way:3
            }
        },{
            color : "黑色",
            total:{
                store:68,
                online:4,
                way:12
            },
            S : {
                store:17,
                online:1,
                way:3
            },
            M : {
                store:17,
                online:1,
                way:3
            },
            L: {
                store:17,
                online:1,
                way:3
            },
            XL: {
                store:17,
                online:1,
                way:3
            }
        }],
        sale:[{
            color:"红色",
            amount:{
                total:42,
                nowDay:10,
                dayOne:9,
                dayTwo:12,
                dayThree:1,
                dayFour:6,
                dayFive:2,
                daySix:2
            }
        },{
            color:"蓝色",
            amount:{
                total:42,
                nowDay:10,
                dayOne:9,
                dayTwo:12,
                dayThree:1,
                dayFour:6,
                dayFive:2,
                daySix:2
            }
        },{
            color:"黄色",
            amount:{
                total:42,
                nowDay:10,
                dayOne:9,
                dayTwo:12,
                dayThree:1,
                dayFour:6,
                dayFive:2,
                daySix:2
            }
        },{
            color:"黑色",
            amount:{
                total:42,
                nowDay:10,
                dayOne:9,
                dayTwo:12,
                dayThree:1,
                dayFour:6,
                dayFive:2,
                daySix:2
            }
        }]
    }
};

page.init = function () {
    page.initElement();
    page.initEvent();
};

page.initElement = function () {
    const thisPage = this;
//    取cookie值
    var storeCode, opCode;
    storeCode= $.cookie("storeCode");
    opCode= $.cookie("opCode");
    if( storeCode && opCode ){
        thisPage.storeCodeInput.val(storeCode);
        thisPage.opCodeInput.val(opCode);
    }
};
page.initEvent = function () {
    const thisPage = this;

    $('#sdCodeInput').change(function () {
        $('#sdCodeForm').removeClass('error-border');
    });
    $('#vCodeInput').change(function () {
        $('#vCodeForm').removeClass('err-border');
    });

    // 扫描 btn 事件
    thisPage.scanButton.click(function () {
        if(!thisPage._checkFlag) {
            var storeCode, opCode;
            storeCode = thisPage.storeCodeInput.val();
            opCode = thisPage.opCodeInput.val();
            //TODO 门店号 操作码 发送ajax进行验证
            if (!storeCode) {
                $.toast(I18N["indexDisplay.storeCode.null"], "forbidden");
                $('#sdCodeForm').addClass('error-border');
                return;
            } else if (!opCode) {
                $('#vCodeForm').addClass('error-border');
                $.toast(I18N["indexDisplay.opCode.null"], "forbidden");
                return;
            }
            $.cookie("storeCode", storeCode, {
                path: "/",
                expiress: 365
            });
            $.cookie("opCode", opCode, {
                path: "/",
                expiress: 365
            });
            thisPage._checkFlag=true;
        }

        //TODO 调wechat扫描接口，并发送ajax请求数据
        var data = thisPage.mockData;
        thisPage.commonQuery.show();
        thisPage.inventoryTablePanel.show();
        thisPage.saleTablePanel.show();
        thisPage.commonQueryIndex.hide();
        thisPage.renderProductInfo(data.product);//产品info
        thisPage.renderInventory(data.size, data.inventory);//info table
        thisPage.renderSales(data.sale);// sale table
    });
};
//渲染产品信息
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
        ]
    });
    img.click(function () {
        pb.open();
    });

    var info = $('<div>').addClass('weui_media_bd').appendTo(link);
    var table = $('<table>').addClass('guide-product-info').appendTo(info);
    var tHead = $('<thead>').appendTo(table);
    tr = $('<tr>').appendTo(tHead);
    $('<td>').html('SKU：').append(product.sku).appendTo(tr);

    var tBody = $('<tbody>').appendTo(table);

    tr = $('<tr>').appendTo(tBody);
    $('<td>').html(I18N["common.product.brand"]+'：').append(product.brand).appendTo(tr);

    tr = $('<tr>').appendTo(tBody);
    $('<td>').html(I18N["common.product.season"]+'：').append(product.season).appendTo(tr);

    tr = $('<tr>').appendTo(tBody);
    $('<td>').html(I18N["common.product.name"]+'：').append(product.name).appendTo(tr);

    tr=$('<tr>').appendTo(tBody);
    td=$('<td>').append(product.color).appendTo(tr);
    $('<span class="margin-left">').html(product.color_size).appendTo(td);
    $('<span>').html(I18N["common.product.price"] +product.tag_price).appendTo(td);

    tr = $('<tr>').appendTo(tBody);
    td = $('<td>').html(I18N["common.product.lastDiscount"]+'：').appendTo(tr);
    $('<span>').html(product.last_discount).appendTo(td);

    tr = $('<tr>').appendTo(tBody);
    td = $('<td style="color: #E80076;">').html(I18N["common.product.curDiscount"]+'：').appendTo(tr);
    $('<span class="margin-left">').html(product.cur_discount).appendTo(td);
    $('<span class="margin-left">').html(I18N["common.product.price"]+product.discount_price).appendTo(td);
    $('<span>').html('['+product.inventory+']').appendTo(td);
};
//渲染库存表
page.renderInventory = function (size, inventory) {
    const thisPage = this;
    var tr1,tr2, length, width;

    thisPage.sizePanel.empty();
    thisPage.inventoryPanel.empty();
    thisPage.inventoryColorThead.empty();
    thisPage.inventoryColorTbody.empty();
    length = size.length;

    if(length <= 4){
        width = 100/(length);
    }else{
        width = 100/5;
        thisPage.inventoryTable.width(width*(length) + "%");
    }
    width += "%";

    //渲染表头
    //渲染颜色表格的表头
   tr1= $('<tr>').appendTo(thisPage.inventoryColorThead);
    $('<th>').html(I18N["commonQuery.colorText"]).appendTo(tr1);
    $('<th>').html(I18N["commonQuery.common.combined"]).appendTo(tr1);

    // $('<th>').width(width).html('颜色').appendTo(thisPage.sizePanel);
    size.forEach(function (s) {
        $('<th>').width(width).html(s.title).appendTo(thisPage.sizePanel);
    });

    //渲染库存数据
    var storeOnlineWay,td,v,kk=0,v_num,countTotal=0,e;

    inventory.forEach(function (i) {
        countTotal=0;
        tr1 = $('<tr>').appendTo(thisPage.inventoryColorTbody).click(function () {//点击颜色事件
            var $this=$(this),
                nowColor;//当前点击颜色值
            nowColor=i.color;
            thisPage.clickColors(nowColor);
        });//颜色table
        $('<td>').html(i.color).appendTo(tr1);

       td= $('<td>').appendTo(tr1);
       for( e in i.total ){ //遍历total
           v_num = i.total[e];
           if(v_num == 0 ){
               v_num=" ";
           }
           if(countTotal>0){
               td.append('/');
           }
           countTotal++;
           $('<span>').html(v_num).appendTo(td);
       }

        $('<td>').html(i.total).appendTo(tr1);

        tr2=$('<tr>').appendTo(thisPage.inventoryPanel).click(function () {//点击颜色事件
            var $this=$(this),
                nowColor;//当前点击颜色值
            nowColor=i.color;
            thisPage.clickColors(nowColor);
        });// 右边 tbody 型号
        // 通过size 的s.code 找到颜色对应型号 i[ s.code ] 的库存  对其遍历渲染
        size.forEach(function (s) {
            kk=0;

            storeOnlineWay=i[s.code];
            td=$('<td>').appendTo(tr2);
            for( v in storeOnlineWay ){ //对象时
                v_num=storeOnlineWay[v];
                if(v_num==0){
                    v_num=' ';
                }
                if(kk>0){
                    td.append('/');
                }
                kk+=1;
                $('<span>').html(v_num).appendTo(td);
            }
        });
    });
};
//渲染销售table
page.renderSales=function (sale) {
const thisPage=this;
    thisPage.salePanel.empty();
    var tr,td,amount,e;
    sale.forEach(function (i) {
        tr=$('<tr>').appendTo(thisPage.salePanel).click(function () {//点击颜色事件
            var $this=$(this),
                nowColor;//当前点击颜色值
            nowColor=i.color;
            thisPage.clickColors(nowColor);
        });
        $('<td>').html(i.color).appendTo(tr);
        amount=i.amount;
        for( e in amount ){
            $('<td>').html(amount[e]).appendTo(tr);
        }
    });
};
page.clickColors=function (a) {
    //TODO 发送ajax 返回product 重新渲染 参数：当前颜色和sku号 ；
    var thisPage=this,
        data = thisPage.mockData;
    console.log(a);
    console.log(data.product.sku);
    thisPage.renderProductInfo(data.product);//重新渲染产品信息
};

$(function () {
    page.init();
});