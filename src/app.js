let api_url = "https://7311e0b5-2f76-4d43-97c0-b34423322f60.mock.pstmn.io/";
const App = {
  data() {
    return {
      datepicker: [new Date(), new Date()],
      tableData: [],

      currentPage: 1,
      sizeTable: 25,
      total_page: 0,
      total_item: 0,
      sizePage: [25, 50, 75, 100],
      offset: 0,
      checkedGames: [],
      games: [],
      btn_con: true,

      member: 0,
      agent: 0,
      master: 0,
      senior: 0,
      sub_company: 0,
      company: 0,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAgentList();
    },
    sizeTableChange() {
      this.currentPage = 1;
      this.submitReport();
    },
    handleCheckAllChange() {
      const value = this.games.status;
      for (let i = 0; i < this.games.data.length; i++) {
        this.games.data[i].status = value;
        this.handleCheckedGamesChange();
      }
      if (value == true) {
        this.btn_con = false;
      } else {
        this.btn_con = true;
      }
    },
    handleCheckedGamesChange() {
      let game_list = [];
      let count = 0;
      this.games.data.forEach((element) => {
        if (element.status == true) {
          count += 1;
        }
        game_list.push(element);
      });
      if (count == game_list.length) {
        this.games.status = true;
      } else {
        this.games.status = false;
      }
      if (count > 0) {
        this.btn_con = false;
      }
      if (count == 0) {
        this.btn_con = true;
      }
    },
    async getlistGames() {
      this.btn_con = true;
      let game_list = [];
      this.games.status = true;
      await axios({
        method: "GET",
        url: api_url + "v1/game",
        headers: {
          Authorization: "Bearer",
        },
      }).then((res) => {
        this.games.data = res.data.data;
        this.games.data.forEach((element) => {
          element.game_Upper = element.game.toUpperCase();
          element.status = true;
          game_list.push(element);
        });
        this.games.data = game_list;
        this.btn_con = false;
      });
    },

    async submitReport() {
      let submit = true;
      this.btn_con = true;
      this.tableData = [];
      let game_list = [];
      this.games.data.forEach((element) => {
        if (element.status == true) {
          game_list.push(element.game);
        }
      });
      if (game_list == "") {
        submit = false;
        alert("ระบุอย่างน้อย 1 เกม");
      } else if (this.datepicker == "") {
        submit = false;
        alert("ระบุวันเริ่มต้นและสิ้นสุด");
      }
      if (submit) {
        this.offset = (this.currentPage - 1) * this.sizeTable;
        let start = moment(new Date(this.datepicker[0])).format(
          "YYYY/MM/DD 00:00:00"
        );
        let end = moment(new Date(this.datepicker[1])).format(
          "YYYY/MM/DD 23:59:59"
        );
        var bodyFormData = new FormData();
        bodyFormData.set("downline_username", "bbga");
        bodyFormData.set("offset", this.offset);
        bodyFormData.set("limit", this.sizeTable);
        bodyFormData.set("start_date", start);
        bodyFormData.set("end_date", end);
        bodyFormData.set("game", game_list);

        await axios({
          method: "POST",
          url: api_url + "v1/winlose",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer",
          },
          data: bodyFormData,
        }).then((res) => {
          this.tableData = res.data.data;
          this.tableData.forEach((element) => {
            if (element.member != undefined) {
              this.member = 1;
              element.member.wl_show = true;
              element.member.com_show = true;
              element.member.total_show = true;
              element.member.wl_2 = this.formatMoney(
                this.toFixed2(element.member.wl)
              );
              element.member.com_2 = this.formatMoney(
                this.toFixed2(element.member.com)
              );
              element.member.total_2 = this.formatMoney(
                this.toFixed2(element.member.total)
              );
            }
            if (element.agent != undefined) {
              this.agent = 1;
              element.agent.wl_show = true;
              element.agent.com_show = true;
              element.agent.total_show = true;
              element.agent.wl_2 = this.formatMoney(
                this.toFixed2(element.agent.wl)
              );
              element.agent.com_2 = this.formatMoney(
                this.toFixed2(element.agent.com)
              );
              element.agent.total_2 = this.formatMoney(
                this.toFixed2(element.agent.total)
              );
            }
            if (element.master != undefined) {
              this.master = 1;
              element.master.wl_show = true;
              element.master.com_show = true;
              element.master.total_show = true;
              element.master.wl_2 = this.formatMoney(
                this.toFixed2(element.master.wl)
              );
              element.master.com_2 = this.formatMoney(
                this.toFixed2(element.master.com)
              );
              element.master.total_2 = this.formatMoney(
                this.toFixed2(element.master.total)
              );
            }
            if (element.senior != undefined) {
              this.senior = 1;
              element.senior.wl_show = true;
              element.senior.com_show = true;
              element.senior.total_show = true;
              element.senior.wl_2 = this.formatMoney(
                this.toFixed2(element.senior.wl)
              );
              element.senior.com_2 = this.formatMoney(
                this.toFixed2(element.senior.com)
              );
              element.senior.total_2 = this.formatMoney(
                this.toFixed2(element.senior.total)
              );
            }
            if (element.sub_company != undefined) {
              this.sub_company = 1;
              element.sub_company.wl_show = true;
              element.sub_company.com_show = true;
              element.sub_company.total_show = true;
              element.sub_company.wl_2 = this.formatMoney(
                this.toFixed2(element.sub_company.wl)
              );
              element.sub_company.com_2 = this.formatMoney(
                this.toFixed2(element.sub_company.com)
              );
              element.sub_company.total_2 = this.formatMoney(
                this.toFixed2(element.sub_company.total)
              );
            }
            if (element.company != undefined) {
              this.company = 1;
              element.company.wl_show = true;
              element.company.com_show = true;
              element.company.total_show = true;
              element.company.wl_2 = this.formatMoney(
                this.toFixed2(element.company.wl)
              );
              element.company.com_2 = this.formatMoney(
                this.toFixed2(element.company.com)
              );
              element.company.total_2 = this.formatMoney(
                this.toFixed2(element.company.total)
              );
            }
          });

          this.total_page = Math.ceil(res.data.meta.total / this.sizeTable);
          this.total_item = parseInt(res.data.meta.total);
          this.sizeTable = +this.sizeTable;
          this.btn_con = false;
        });
      }
    },

    formatMoney(value) {
      let num, str;
      if (value === undefined || value === null) {
        return "0";
      } else if (typeof value === "number") {
        num = value.toFixed(2);
      } else {
        num = value;
      }
      str = num.toString().split(".");
      let label = "0";
      if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      if (str[1]) {
        label = str[0] + "." + str[1];
      } else {
        label = str[0] + ".00";
      }
      return label;
    },
    formatMemer(value) {
      let num, str;
      if (value === undefined || value === null) {
        return "0";
      } else {
        num = value;
      }
      str = num.toString().split(".");
      let label = "0";
      if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      label = str[0];
      return label;
    },

    toFixed2(value) {
      let num;
      if (value === undefined || value === null) {
        return "0";
      } else {
        num = value;
      }
      label = Math.floor(value.replace(/[-]/g, "") * 100) / 100;
      if (value < 0) {
        label = "-" + label;
      }
      return label;
    },

    checkToFixed2(value) {
      let num;
      if (value === undefined || value === null) {
        return "0";
      } else {
        num = value;
      }
      label = value.split(".")[1];
      label = label.slice(2);
      return label;
    },
  },
  async created() {
    this.getlistGames();
  },
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
