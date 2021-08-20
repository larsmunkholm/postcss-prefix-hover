module.exports = (opts) => {
    const useCssModulesGlobal = opts && typeof opts.useCssModulesGlobal !== "undefined" ? opts.useCssModulesGlobal : false;
    const prefix = opts && typeof opts.prefix !== "undefined" ? opts.prefix : ".using-mouse";

    function setPrefix (selector) {
        const thePefix = (useCssModulesGlobal ? ":global(" : "") + prefix + (useCssModulesGlobal ? ")" : "");
        return thePefix + " " + selector.replace(/,\s+/g, ", " + thePefix + " ");
    }

    return {
        postcssPlugin: 'postcss-prefix-hover',
        Root (root) {
            root.walkRules((rule) => {
                if (rule.selector.indexOf(":hover") > -1) {
                    rule.selector = setPrefix(rule.selector);
                }
            });
        }
    }
}

module.exports.postcss = true;
