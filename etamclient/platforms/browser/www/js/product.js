var app = {
    initialize: function () {
        $(document).ready(function () {
            let token = window.localStorage.getItem("token");
            if (!token) {
                console.log("token not exist");
                window.location = "index.html";
            }
            $.ajaxSetup(
                {
                    headers: { Authorization: "Bearer " + token }
                }
            );

            const url_pickorder = "http://172.16.33.79:3000/pickorder/1";
            $.ajax(url_pickorder)
                .success(function (data) {
                    if (data.length > 0) {
                        data.forEach(function (o) {
                            $("<div class='weui_media_hd'><img class='weui_media_appmsg_thumb skuImg' style='width:70px;height:70px;' src='http://www2.intermoda.com.cn/productimage/" 
                            + o.Brand.Brand_Name + "/" + o.TSKUSku.substr(0,9) + o.TSKUSku.substr(11,2)  +".jpg' /></div>")
                            .appendTo($("#productList"));
                            

                            let pSKU = "<p class='weui_media_title'><span style='color: #5e5e5e;'>" + o.TSKUSku + "</span></p>"
                            let pName = "<p>" + o.T_SKU.productname + "</p>"
                            let pBrand = "<p>" + o.Brand.Brand_Name + "</p>"
                            let pColor = "<p>" + o.T_SKU.color + "</p>"
                            let pSize = "<p>" + o.T_SKU.sizename + "</p>"
                            let pPrice = "<p>" + o.T_SKU.onsale + "</p>"

                            $("<div class='weui_media_bd' style='line-height: 25px;'></div>")
                                .append(pSKU)
                                .append(pName)
                                .append(pBrand)
                                .append(pColor)
                                .append(pSize)
                                .append(pPrice).appendTo("#productList");
                        });
                    }

                })
        });
    }
}

app.initialize();