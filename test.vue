
                <li class="bot-line padTopBot10" @click="showDetailInfo(i)" v-for="(item,i) in orderList">
                    <div class="box-l padL18">
                        <strong class="block f14 beforeIcon">
                            <i v-if="item.isRead === 'N' "></i>{{item.news_name || item.title}}
                        </strong>
                        <small class="f12">{{ymd(item.crtDate)}}</small>
                    </div>
                    <div class="box-r text-right">
                        <i>&gt;</i>
                    </div>
                </li>


<script type="text/javascript">
    import topControl from '../components/common/mycTool.vue';
    import api from '../libs/api.js'; // 接口调用方法的封装文件
    import GOMEUtil from '../libs/gomeutil.js';
    import utils from '../libs/utils';
    export default {
        data() {
            return {
                // 头部标题
                topTtile: '我的消息',
                isRead: false, // 消息是否已读
                allRead: { //
                    allIsRead: true, // 所有信息是否已经阅读过,true:还没读,false:已经读过
                    msgListState: [] // 哪条消息已经阅读过了 true:还没读,false:已经读过
                }, // 存储那些消息是已经阅读过
                // 接受接口返回的数据
                list: [], // 列表数据
                // 保存在vuex里的用户信息
                _USER_INFO: {},
                // 保存在vuex里面的消息阅读信息
                _READ_INFO: {},
                userParam: {
                    nativeMethod: 'obtainUserInfo',
                    data: {
                        data: '',
                        method: 'getUserInfo',
                        isValue: true
                    }
                }
            };
        },
        methods: {
            // 根据时间戳获取年月日
            ymd: function (time) {
                var D = new Date(Number(time));
                var y = D.getFullYear();
                var m = D.getMonth() + 1;
                var d = D.getDate();
                var h = D.getHours();
                var mm = D.getMinutes();
                if (m < 10) {
                    m = '0' + `${m}`;
                }
                if (d < 10) {
                    d = '0' + `${d}`;
                }
                return `${y}-${m}-${d}  ${h}:${mm}`;
            },
            /**
             * 返回
             */
            btnGoBack() {
                // 原生返回事件
                GOMEUtil.back2Native(GOMEUtil);
            },
            showDetail: function (i) {
                // 存储点击的该条信息的相关字段，当点击该条信息，进入它的详情的时候需要用到里面的字段
                this.$store.dispatch('showMsg', this.list[i]);
                if (this.allRead.msgListState.length === 1) {
                    this.allRead.allIsRead = false;
                    this._READ_INFO.msgListState[i] = false;
                } else {
                    this._READ_INFO.msgListState[i] = false; // 点击了这条新闻,那么这条新闻就设置成已查看
                }

                this.$store.dispatch('allRead', this._READ_INFO); // 将最新的消息存入到vuex里面去
                // 跳转到某种类型的页面
                let jumpTypePage = (pageUrl) => {
                    this.$router.push({
                        name: pageUrl
                    });
                };
                // 获取该条消息的类型
                let detailType = this.list[i].news_type || this.list[i].msgType;
                switch (detailType) {
                    case '01': //  公告
                        jumpTypePage('msgDetail');
                        break;
                    case '02': // 系统提示
                        jumpTypePage('msgDetail');
                        break;
                    case '03': // 通知
                        jumpTypePage('msgDetail');
                        break;
                    case '04': // 知识库
                        jumpTypePage('msgDetail');
                        break;
                    case '05': // 请假
                        jumpTypePage('examineRes');
                        break;
                    case '06': // 请假审批
                        jumpTypePage('examineRes');
                        break;
                    case '07': // 公休假
                        jumpTypePage('examineRes');
                        break;
                    case '08': // 公休假审批
                        jumpTypePage('examineRes');
                        break;
                    case '09': // 站内信
                        jumpTypePage('examineRes');
                        break;
                }
                ;
            },
            urlJump: function (n) {
                this.$router.go(-1);
            },
            read: function () {
                // alert('已读');
            },
            // 判断该条信息是否是已读信息
            isReadState: function (i) {
                // console.log('this._READ_INFO:', this._READ_INFO);
                // console.log('this._READ_INFO.allIsRead:', this._READ_INFO.allIsRead);
                // if (this._READ_INFO.allIsRead) { // 如果设置所有信息为已读那么所有信息前面的红色小提示圆点都消失

                //     return this._READ_INFO.allIsRead;
                // } else {

                //     return this._READ_INFO.msgListState[i];
                // }
            },

            // 触发全部已读的点击事件
            // allRead: function() {
            //     let senData = {
            //         optNo: 'mf160708015644'
            //     };
            //     api.messagesReaded(senData).then(
            //         res => {
            //             console.info('设置成已读成功', res);
            //             // 跳转到某种类型的页面
            //             let jumpTypePage = (pageUrl) => {
            //                 this.$router.push({
            //                     name: pageUrl
            //                 });
            //             };
            //             // 获取该条消息的类型
            //             let detailType = this.list[i].news_type || this.list[i].msgType;
            //             switch (detailType) {
            //                 case '01': //  公告
            //                     jumpTypePage('msgDetail');
            //                     break;
            //                 case '02': // 系统提示
            //                     jumpTypePage('msgDetail');
            //                     break;
            //                 case '03': // 通知
            //                     jumpTypePage('msgDetail');
            //                     break;
            //                 case '04': // 知识库
            //                     jumpTypePage('msgDetail');
            //                     break;
            //                 case '05': // 请假
            //                     jumpTypePage('examineRes');
            //                     break;
            //                 case '06': // 请假审批
            //                     jumpTypePage('examineRes');
            //                     break;
            //                 case '07': // 公休假
            //                     jumpTypePage('examineRes');
            //                     break;
            //                 case '08': // 公休假审批
            //                     jumpTypePage('examineRes');
            //                     break;
            //                 case '09': // 站内信
            //                     jumpTypePage('examineRes');
            //                     break;
            //             };
            //         },
            //         res => {
            //             console.info('设置成已读失败', res);
            //         })
            // },

            // 查询某条消息是否已读
            showDetailInfo: function (i) {
                let detailAttr = this.list[i]; // 该条消息所携带的字段
                // console.log(JSON.stringify(detailAttr));
                window.localStorage.setItem('msgDetail', JSON.stringify(detailAttr));
                // this.$store.dispatch('msgDetail', detailAttr); // 存储该条消息的所有属性,详情页面请求接口会用到
                let msgType = detailAttr.msgType; // 获取该条消息的类型
//                alert(`某条信息的相关属性:${JSON.stringify(detailAttr)}`);
                // 跳转到某种类型的页面
                let jumpTypePage = (pageUrl) => {
                    this.$router.push({
                        name: pageUrl
                    });
                };
                // 获取该条消息的类型
                switch (msgType) {
                    case '01': //  公告
                        jumpTypePage('msgDetail');
                        break;
                    case '02': // 系统提示
                        jumpTypePage('msgDetail');
                        break;
                    case '03': // 通知
                        jumpTypePage('msgDetail');
                        break;
                    case '04': // 知识库
                        jumpTypePage('msgDetail');
                        break;
                    case '05': // 请假
                        jumpTypePage('examineRes');
                        break;
                    case '06': // 请假审批
                        jumpTypePage('examineRes');
                        break;
                    case '07': // 公休假
                        jumpTypePage('examineRes');
                        break;
                    case '08': // 公休假审批
                        jumpTypePage('examineRes');
                        break;
                    case '09': // 站内信
                        jumpTypePage('examineRes');
                        break;
                }
                ;
            }
        },
        components: {
            'top-control': topControl
        },
        directives: {},
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
        mounted: function () {
            let that = this;
            // 将用户的信息存起来，方便用户在输入信息时候去比对
            GOMEUtil.JsBridge(that.userParam, function (data) {
                data = utils.nativeDataFilter(data);
                window.localStorage.setItem('userInfo', data);
            });
            setTimeout(() => {
                let res = JSON.parse(window.localStorage.getItem('userInfo'));
                that._USER_INFO = res;
                let sendData = {
                    optNo: this._USER_INFO.personNo,
                    curPagerNo: 1,
                    pageSize: 1000
                };

                // 请求我的消息的接口
                api.querymsglist(sendData).then(
                    res => {
                        var Data = res.body;
                        // 消息列表接口请求成功
                        if (Data.code === 0) {
                            that.list = Data.data.list;
                        } else {
                            that.$root.dataObj = {
                                content: res.body.showMsg,
                                state: true
                            };
                        };
                    },
                    res => {
                        that.$root.dataObj = {
                            content: '系统异常',
                            state: true
                        };
                    });
            }, 200);
        }
    };
</script>
