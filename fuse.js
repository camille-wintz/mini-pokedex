const { SassPlugin, FuseBox, CSSPlugin, WebIndexPlugin } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir : "src",
    target : 'browser@es6',
    output : "dist/$name.js",
    useTypescriptCompiler : true,
    sourceMaps: true,
    plugins : [
         [
            SassPlugin(), 
            CSSPlugin()
        ]
    ]
});

fuse.dev({
    root: '.',
    fallback: 'index.html'
});
fuse.bundle("app").instructions(" > index.tsx").hmr().watch();
fuse.run();