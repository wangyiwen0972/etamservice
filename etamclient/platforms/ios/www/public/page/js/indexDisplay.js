/**
 * Created by Administrator on 2017/1/12.
 */
const page = {
    storeCodeInput: $('#sdCodeInput'),
    opCodeInput: $('#vCodeInput'),
    url: {}
};
page.init = function () {
    const thisPage = this;
    thisPage.initEvent();
    thisPage.initElement();
};
page.initElement = function () {
    const thisPage = this;
    var storeCode, opCode;
    storeCode = $.cookie("storeCode");
    opCode = $.cookie("opCode");
    if (storeCode && opCode) {
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
    $('.toProduct').on("click", function () {
        var storeCode, opCode, data, alertListTitle;
        const $this = $(this);
        data = $this.data('multi');
        storeCode = thisPage.storeCodeInput.val();
        opCode = thisPage.opCodeInput.val();
        if (!storeCode) {
            $.toast(I18N["indexDisplay.storeCode.null"], "forbidden");
            $('#sdCodeForm').addClass('error-border');
            return;
        } else if (!opCode) {
            $('#vCodeForm').addClass('error-border');
            $.toast(I18N["indexDisplay.opCode.null"], "forbidden");
            return;
        }

        $.ajax({
            url: '/api/4c7b346d00854494aa6b97dd47f965eb',
            type: 'POST',
            data: JSON.stringify({store: storeCode, code: opCode}),
            dataType: 'json',
            contentType: "application/json; charset=UTF-8",
            async: true,
            cache: false,
            success: function (reData, textStatus) {
                if (reData != '1') {
                    $("#errorMsg").html(reData);
                    return;
                }
                $.cookie("storeCode", storeCode, {
                    path: "/",
                    expires: 365
                });
                $.cookie("opCode", opCode, {
                    path: "/",
                    expires: 365
                });
                if (data === 0) {
                    $.ajax({
                        url: '/api/918d7c1c91bb4f61824f5371804efdaa',
                        type: 'POST',
                        data: JSON.stringify({storeNo: storeCode, lang: "zh"}),
                        dataType: 'json',
                        contentType: "application/json; charset=UTF-8",
                        async: true,
                        cache: false,
                        success: function (reData, textStatus) {
                            var proContent = [];
                            for (var i = 0; i < reData.length; i++) {
                                proContent.push('<a href="javascript:void (0)" ' +
                                    'class="weui_btn weui_btn_primary DisplayAlertList" ' +
                                    'data-brand="' + reData[i].code + '" ' +
                                    'onclick="displayDiscountList(this);" >' + reData[i].name + '</a>');
                            }
                            if (proContent.length > 0) {
                                $.modal({
                                    title: "折扣变动品牌|BRANDS",
                                    text: proContent.join(''),
                                    buttons: [
                                        {
                                            text: "确定 | OK",
                                            onClick: function () {
                                                window.location.href = '/view/discountList?storeNo=' + storeCode;
                                            }
                                        },

                                        {
                                            text: "取消 | CANCEL", className: "default", onClick: function () {
                                        }
                                        },
                                    ]
                                });
                            } else {
                                window.location.href = encodeURI('/view/discountList?brand=9999&storeNo=' + $('#sdCodeInput').val());
                            }
                        }
                    });
                } else if (data === 1) {
                    window.location.href = '/view/scanDiscount?storeNo=' + storeCode;
                } else if (data === 3) {
                    window.location.href = '/view/stockQuery?storeNo=' + storeCode;
                } else if (data === 2) {
                    $.ajax({
                        url: '/api/dd3bcbbc5b7e4a06b8118ab44395a21d',
                        type: 'POST',
                        data: JSON.stringify({storeNo: storeCode, lang: "zh"}),
                        dataType: 'json',
                        contentType: "application/json; charset=UTF-8",
                        async: true,
                        cache: false,
                        success: function (reData, textStatus) {
                            console.log(reData);
                            var proContent = [];
                            for (var i = 0; i < reData.length; i++) {
                                proContent.push('<a href="javascript:void (0)" ' +
                                    'class="weui_btn weui_btn_primary DisplayAlertList" ' +
                                    'data-proid="' + reData[i].promotionId + '" ' +
                                    'onclick="displayAlertList(this);" >' + reData[i].promotionName + '</a>');
                            }
                            if (proContent.length > 0) {
                                $.modal({
                                    title: "活动|PROMOTIONS",
                                    text: proContent.join(''),
                                    buttons: [
                                        {
                                            text: "确定 | OK",
                                            onClick: function () {
                                                window.location.href = encodeURI('/view/activityDesign?id=' + $('.DisplayAlertListGL').data('proid') + '&storeNo=' + storeCode);
                                            }
                                        },

                                        {
                                            text: "取消 | CANCEL", className: "default", onClick: function () {
                                        }
                                        },
                                    ]
                                });
                            } else {
                                alert(I18N["common.now.store.no.acty"]);
                            }
                        }
                    });
                }
            },
            error: function () {
                alert(I18N["common.Networkan.omalies"]);
            }
        });
    });

    $('body').on('click', '.weui_mask.weui_mask_visible', function () {
        $.closeModal();
    })
};
$(function () {
    page.init();
});

function displayAlertList(el) {
    $(el).addClass('DisplayAlertListGL').siblings().removeClass('DisplayAlertListGL');
    window.location.href = encodeURI('/view/activityDesign?id=' + $(el).data('proid') + '&storeNo=' + $('#sdCodeInput').val());
}

function displayDiscountList(el) {
    $(el).addClass('DisplayAlertListGL').siblings().removeClass('DisplayAlertListGL');
    window.location.href = encodeURI('/view/discountList?brand=' + $(el).data('brand') + '&storeNo=' + $('#sdCodeInput').val());
}