qx.Class.define("scada.widget.test.period.helper.DateTime", {
    extend : qx.dev.unit.TestCase,

    members: {
        setUp(){
            this.helper = scada.widget.period.helper.DateTime;
        },

        __format(date){
            const dt = new qx.util.format.DateFormat("dd.MM.yyyy HH:mm");
            return dt.format(date);
        },

        assertDates(expected, date){
            this.assertEquals(expected, this.__format(date));
        },

        testAddTimeToDate_addOneHour(){
            const date = new Date("2022-01-01");
            const time = 3600;

            this.helper.addTimeToDate(date, time);

            this.assertDates("01.01.2022 01:00", date);
        },

        testSetDayStart(){
            const date = new Date("2022-01-01 13:01");

            this.helper.setDayStart(date);

            this.assertDates("01.01.2022 00:00", date);
        },

        testSetDayEnd(){
            const date = new Date("2022-01-01 13:01");

            this.helper.setDayEnd(date);

            this.assertDates("01.01.2022 23:59", date);
        },

        testExtractTimeFromDateTime(){
            const date = new Date("2022-01-01 13:01");

            const time = this.helper.extractTimeFromDateTime(date);

            this.assertEquals("13:01:00", time);
        },

        testGetPrevDayOfDate_firstDayOfMonth(){
            const dt = new Date("2022/02/01 13:01");

            const res = this.helper.getPrevDayOfDate(dt);

            this.assertDates("31.01.2022 13:01", res);
        },

        testGetPrevDayOfDate(){
            const dt = new Date("2022/02/10 13:01");

            const res = this.helper.getPrevDayOfDate(dt);

            this.assertDates("09.02.2022 13:01", res);
        },

        testGetPrevDayOfDate_firstDayOfYear(){
            const dt = new Date("2022/01/01 13:01");

            const res = this.helper.getPrevDayOfDate(dt);

            this.assertDates("31.12.2021 13:01", res);
        },

        testGetHourStartSeconds(){
            const dt = new Date("2022/01/01 13:01");

            const startHours = this.helper.getHourStartSeconds(dt);

            this.assertEquals(13*3600, startHours);
        }
    }
});