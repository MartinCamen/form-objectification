(function($) {
    $.fn.objectifyForm = function( options ) {

        var settings = $.extend({
            'selector'       : 'name',
            'exclude'        : [],
            'checkboxesAll'  : true,
            'checkboxesData' : 'boolean'
        }, options);

        var data             = {},
            allowedSelectors = ['name', 'id'],
            inputs           = $(this).find(':input').not(':input[type=button], :input[type=submit], :input[type=reset], :button');

        if (typeof settings.before != 'undefined' && typeof settings.before == 'function') {
            settings.before.call(this, settings, data);
        }

        settings.selector = $.inArray(settings.selector, allowedSelectors) > -1 ? settings.selector : 'name';

        $.each(inputs, function(i) {
            var include = true;

            if (settings.exclude.length) {
                if ($.inArray($(inputs[i]).attr('name'), settings.exclude) > -1) {
                    include = false;
                } else {
                    $.each(settings.exclude, function (key, value) {
                        if (
                            ((value.substring(0, 1) == '#') && ('#' + $(inputs[i]).attr('id') == value )) ||
                            ((value.substring(0, 1) == '.') && ($(inputs[i]).hasClass(value.replace('.', ''))))
                           ) {
                            include = false;
                        }
                    });
                }
            }

            if (include) {
                if ($(inputs[i]).is(':checkbox')) {
                    if (settings.checkboxesAll) {
                        if (settings.checkboxesData === 'boolean') {
                            data[$(inputs[i]).attr(settings.selector)] = $(inputs[i]).is(':checked') ? 1 : 0;
                        } else {
                            data[$(inputs[i]).attr(settings.selector)] = $(inputs[i]).val();
                        }
                    } else if ($(inputs[i]).is(':checked')) {
                        data[$(inputs[i]).attr(settings.selector)] = 1;
                    }
                } else if ($(inputs[i]).is(':radio')) {
                    if ($(inputs[i]).is(':checked')) {
                        data[$(inputs[i]).attr(settings.selector)] = $(inputs[i]).val();
                    }
                } else {
                    data[$(inputs[i]).attr(settings.selector)] = $(inputs[i]).val();
                }
            }

        });

        if (typeof settings.after != 'undefined' && typeof settings.after == 'function') {
            settings.after.call(this, settings, data);
        }

        return data;
    };

}(jQuery));
