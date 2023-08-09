qx.Class.define("scada.util.test.Path", {
    extend : qx.dev.unit.TestCase,

    members: {
        setUp(){
            this.path = scada.util.Path;
        },

        testCombine(){
            const res = this.path.combine("part1", "part2", "part3");

            this.assertEquals("part1/part2/part3", res);
        },

        testGetDirName(){
            const path = "/home/dir/file.ext";

            const res = this.path.getDirName(path);

            this.assertEquals("/home/dir", res);
        },

        testHasExtension(){
            const path = "/home/dir/file.ext";

            this.assertTrue(this.path.hasExtension(path, "ext"));
        },

        testHasExtension_NoSuchExtension(){
            const path = "/home/dir/file.ext";

            this.assertFalse(this.path.hasExtension(path, "ext2"));
        },

        testHasExtension_ExtensionInMiddleOfPath(){
            const path = "/home/dir/ext/file";

            this.assertFalse(this.path.hasExtension(path, "ext"));
        },

        testAddExtension(){
            const path = "/home/dir/file";

            const res = this.path.addExtension(path, "ext");

            this.assertEquals("/home/dir/file.ext", res);
        }
    }
});
