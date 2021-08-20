const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
    let result = await postcss([plugin(opts)]).process(input, { from: undefined })
    expect(result.css).toEqual(output)
    expect(result.warnings()).toHaveLength(0)
}

it("with default settings", async () => {
    await run(
        'main .container a:hover { color: black; }',
        '.using-mouse main .container a:hover { color: black; }',
        {}
    )
});

it("with prefix option", async () => {
    await run(
        'a:hover { color: black; }',
        '.prefix a:hover { color: black; }',
        { prefix: ".prefix" }
    )
});

it("useCssModulesGlobal", async () => {
    await run(
        'a:hover { color: black; }',
        ':global(.mouse) a:hover { color: black; }',
        { prefix: ".mouse", useCssModulesGlobal: true }
    )
});

it("nested and has children", async () => {
    await run(
        '.tis, .prut { &:hover { &::before { color: black; } } }',
        '.tis, .prut { .using-mouse &:hover { &::before { color: black; } } }',
        {}
    )
});
