module.exports = (opts) => {
    const useCssModulesGlobal = opts && typeof opts.useCssModulesGlobal !== "undefined" ? opts.useCssModulesGlobal : false;
    const prefix = opts && typeof opts.prefix !== "undefined" ? opts.prefix : ".using-mouse";

    function setPrefix (selector) {
        const thePrefix = (useCssModulesGlobal ? ":global(" : "") + prefix + (useCssModulesGlobal ? ")" : "");
        return selector
            .split(",")
            .map((item) => item.indexOf(":hover") > -1 ? item.replace(/^(\s*)/, "$1" + thePrefix + " ") : item)
            .join(",");
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
