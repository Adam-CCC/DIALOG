qx.Class.define("scada.util.test.combiner.Json", {
    extend : qx.dev.unit.TestCase,

    members: {
        setUp(){
            let loader = new scada.util.test.combiner.MockContentLoader();
        },

        testMerge_NoPropertyInSource() {
            const obj1 = {};
            const obj2 = {
                id: 1
            };

            scada.util.combiner.Json.merge(obj1, obj2, "link");

            const expected = {
              link: {
                  id: 1
              }
            };
            this.assertJsonEquals(expected, obj1);
        },

        testMerge_PropertyAlreadyExistsInSource() {
            const obj1 = {
                link: {
                    name: "test"
                }
            };
            const obj2 = {
                id: 1
            };

            scada.util.combiner.Json.merge(obj1, obj2, "link");

            const expected = {
                link: {
                    name: "test",
                    id: 1
                }
            };
            this.assertJsonEquals(expected, obj1);
        },

        testProcess() {

        }
    }
});
