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
      


var data = [{
    name: "jiang",
    age: 22
  }, {
    name: "AAAAAAAAAAAAAA",
    age: 21
  }, {
    name: "CCCCCCCCc",
    age: 25
  }];
  //定义一个比较器
  function compare(propertyName) {
    return function(object1, object2) {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      if (value2 < value1) {
        return 1;
      } else if (value2 > value1) {
        return -1;
      } else {
        return 0;
      }
    }
  }
  //使用方法
  data.sort(compare("age"));
  console.log(data);