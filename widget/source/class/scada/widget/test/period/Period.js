qx.Class.define("scada.widget.test.period.Period", {
    extend : qx.dev.unit.TestCase,

    members: {
        testValidPeriod(){
            const period = new scada.widget.period.Period(1, 2);

            this.assertEquals(1, period.getStart());
            this.assertEquals(2, period.getEnd());
            this.assertTrue(period.isValid());
        },

        testInvalidPeriod(){
            const period = new scada.widget.period.Period(2, 1);

            this.assertFalse(period.isValid());
        }
    }
});