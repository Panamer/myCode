 computed: {
            orderList: function () {
                var compare = function (idx) {
                    return function (object1, object2) {
                        var a = object1[idx];
                        var b = object2[idx];
                        if (b < a) {
                            return -1;
                        } else if (b > a) {
                            return 1;
                        } else {
                            return 0;
                        }
                    };
                };
                return this.list.sort(compare('crtDate'));
            }
        },