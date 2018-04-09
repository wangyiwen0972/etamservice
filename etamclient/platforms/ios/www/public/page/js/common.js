/**
 * Created by Administrator on 2016/9/1.
 */


function dialog(opt){
    var tar = {
        show: '',
        close: '.x-dialog-close',
        back: '.x-dialog-back',
        animate: '',
        backclose: false,
        callback: function(){}
    };
    for(var p in opt){
        tar[p] = opt[p];
    }
    var back = $(tar.back);
    var dialog = back.find('.x-dialog');
    var show = $(tar.show);
    var close = back.find(tar.close);

    show.on('click',function(){
        setTimeout(function(){
            back.addClass('backshow').removeClass('backhide');
            dialog.addClass('dialog'+tar.animate+'show').removeClass('dialog'+tar.animate+'hide');
            tar.callback(show,closed);
        },200);

    });
    close.on('click',function(e){
        e.stopPropagation();
        e.preventDefault();
        closed();
    });
    if(tar.backclose){
        back.on('click',function(e){
            e.stopPropagation();
            e.preventDefault();
            if(e.target == $(this)[0]){
                closed();
            }
        })
    }
    function  closed(){
        dialog.addClass('dialog'+tar.animate+'hide').removeClass('dialog'+tar.animate+'show');
        setTimeout(function(){
            back.addClass('backhide').removeClass('backshow');
        },80)
    }
}

function  tip(ms,time){
    if($('.x-dialog-tip').length){
        $('.x-dialog-tip').remove();
    }
    var dialog_tip = $('<div class="x-dialog-tip"></div>');
    var val = $('<span class="transition02">'+ms+'</span>');
    var tim = time ? time : 1500;
    dialog_tip.append(val);
    $('body').append(dialog_tip);
    setTimeout(function(){
        dialog_tip.addClass('on');
    },0);

    setTimeout(function(){
        dialog_tip.remove();
    },tim)
}

// 加减计数器
function jia_jian_computer(call){
    var cal = call ? call : function(val){};
    var tar = $('.num-computer');
    var max = tar.attr('data-max') - 0;
    var jia = tar.find('.jia');
    var jian = tar.find('.jian');
    var input = tar.find('input');

    jia.on('click',function(){
        var val = input.val() - 0;
        if(val >= max){
            val = max;
        }else {
            val++;
        }
        input.val(val);
        cal(val);
    });
    jian.on('click',function(){
        var val = input.val() - 0;
        if(val <= 1){
            val = 1;
        }else {
            val--;
        }
        input.val(val);
        cal(val);
    });
    input.on('input',function(){
        var val = input.val();
        if(/[.-]/g.test(val)){
            val = val.replace(/[.-]/,'');
        }
        input.val(val);
    });
    input.on('blur',function(){
        var val = input.val() - 0;
        if(val > max){
            val = max;
        }else if(val < 0){
            val = 0
        }
        input.val(val);
        cal(val);
    })
}

//-------------日期选择插件-----------
(function($,win){
    function calendar(opt){
        var tar = {
            tdclick:function(td){}
        };
        for(var p in opt){
            tar[p] = opt[p];
        }
        this.init(tar);
    }
    calendar.prototype = {
        init: function(opt){
            this.date = new Date();
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth();
            this.tdclick = opt.tdclick
        },
        monthinit:function(start){

            var setdate = new Date();
            var setyear = this.year;
            var setmonth = this.month;
            var cur_day_all = null;
            setdate.setFullYear(setyear);
            setdate.setMonth(setmonth+1);
            setdate.setDate(0);


            cur_day_all = setdate.getDate();

            if(start){
                cur_day_all = cur_day_all - start + 1;
            }
            var fillarr = [],c = 1;
            setdate.setMonth(this.month);
            if(start){
                setdate.setDate(start);
                c = start;
            }else {
                setdate.setDate(1);
            }

            var week = setdate.getDay(),cell =0;
            if((cur_day_all + week) % 7 == 0){
                cell = (cur_day_all + week) / 7;
            }else {
                cell = Math.floor((cur_day_all + week) / 7) + 1;
            }
            for(var i = 0; i < cell; i++){
                var arr = [];
                for(var j = 1; j < 8; j++){
                    if((i * 7 + j) < week + 1 || (i * 7 + j) > (cur_day_all + week)){
                        arr.push(null);
                    }else {
                        arr.push(c++);
                    }
                }
                fillarr.push(arr);
            }
            return fillarr;
        },
        createItem:function(fillarr){
            var table = $("<table></table>");
            var _this = this;
            for(var i = 0; i < fillarr.length; i++){
                var tr = $('<tr></tr>');
                for(var j = 0; j < 7; j++){
                    if(fillarr[i][j]){
                        var td = $('<td data-date="'+this.year+'-'+(this.month + 1)+'-'+fillarr[i][j]+'"><span>'+fillarr[i][j]+'</span></td>');
                        td.on('click',function(){
                            _this.tdclick($(this));
                        });
                    }else {
                        var td = $('<td class="empty">&nbsp;</td>');
                    }
                    tr.append(td);
                }
                table.append(tr);
            }

            return table;
        },
        xr:function(){
            var _this = this,start = null;

            var year = this.year, month = this.month;
            if(this.year == this.date.getFullYear() && this.month == this.date.getMonth()){
                start = this.date.getDate();
            }
            var montharr = this.monthinit(start);
            var table = this.createItem(montharr);

            this.month += 1;
            if(this.month == 12){
                this.year += 1;
                this.month = 0;
            }
            return {
                year: year,
                month: month,
                table: table
            }
        }
    };
    win.calendar = function(opt){
        return new calendar(opt);
    }
})(jQuery,window);