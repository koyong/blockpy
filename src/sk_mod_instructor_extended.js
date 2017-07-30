
/**
 * An automatically generated file, based on the files in `instructors/`.
 * We need to have the python code in these files made available in the 
 * JS files, so we load them in via a preprocessing step.
 */

var $INSTRUCTOR_MODULES_EXTENDED = {};

$INSTRUCTOR_MODULES_EXTENDED["instructor_utility.py"] = "from instructor import *\n\ndef is_function_called(name):\n    ast = parse_program()\n    all_calls = ast.find_all('Call')\n    count = 0\n    for a_call in all_calls:\n        if a_call.func.ast_name == 'Attribute':\n            if a_call.func.attr == name:\n                count += 1\n        elif a_call.func.ast_name == 'Name':\n            if a_call.func.id == name:\n                count += 1\n    return count\n    \n'''\n    \n    mod.count_components = new Sk.builtin.func(function(source, component) {\n        Sk.builtin.pyCheckArgs(\"count_components\", arguments, 2, 2);\n        Sk.builtin.pyCheckType(\"source\", \"string\", Sk.builtin.checkString(source));\n        Sk.builtin.pyCheckType(\"component\", \"string\", Sk.builtin.checkString(component));\n        \n        source = source.v;\n        component = component.v;\n        \n        var ast_list = getParseList(source);\n        \n        var count = 0;\n        for (var i = 0, len = ast_list.length; i < len; i = i+1) {\n            if (ast_list[i]._astname == component) {\n                count = count+1;\n            }\n        }\n        \n        return Sk.ffi.remapToPy(count);\n    });\n    \n    mod.no_nonlist_nums = new Sk.builtin.func(function(source) {\n        Sk.builtin.pyCheckArgs(\"no_nonlist_nums\", arguments, 1, 1);\n        Sk.builtin.pyCheckType(\"source\", \"string\", Sk.builtin.checkString(source));\n        \n        source = source.v;\n        \n        var num_list = getNonListNums(source);\n        \n        var count = 0;\n        for (var i = 0, len = num_list.length; i < len; i = i+1) {\n            if (num_list[i].v != 0 && num_list[i].v != 1) {\n                return Sk.ffi.remapToPy(true);\n            }\n        }\n        return Sk.ffi.remapToPy(false);\n    });\n\n    mod.only_printing_properties = new Sk.builtin.func(function(source) {\n        Sk.builtin.pyCheckArgs(\"only_printing_properties\", arguments, 1, 1);\n        Sk.builtin.pyCheckType(\"source\", \"string\", Sk.builtin.checkString(source));\n        \n        source = source.v;\n        \n        var non_var_list = getPrintedNonProperties(source);\n        return Sk.ffi.remapToPy(non_var_list.length == 0);\n    });\n\n\n    \n    /**\n     * Given source code as a string, return a list of all of the AST elements\n     * that are Num (aka numeric literals) but that are not inside List elements.\n     *\n     * @param {String} source - Python source code.\n     * @returns {Array.number} The list of JavaScript numeric literals that were found.\n     */\n    function getNonListNums(source) {\n        if (!(source in parses)) {\n            var parse = Sk.parse(\"__main__\", source);\n            parses[source] = Sk.astFromParse(parse.cst, \"__main__\", parse.flags);\n        }\n        var ast = parses[source];\n        var visitor = new NodeVisitor();\n        var insideList = false;\n        var nums = [];\n        visitor.visit_List = function(node) {\n            insideList = true;\n            this.generic_visit(node);\n            insideList = false;\n        }\n        visitor.visit_Num = function(node) {\n            if (!insideList) {\n                nums.push(node.n);\n            }\n            this.generic_visit(node);\n        }\n        visitor.visit(ast);\n        return nums;\n    }\n    \n    /**\n     * Given source code as a string, return a list of all of the AST elements\n     * that are being printed (using the print function) but are not variables.\n     *\n     * @param {String} source - Python source code.\n     * @returns {Array.<Object>} The list of AST elements that were found.\n     */\n    function getPrintedNonProperties(source) {\n        if (!(source in parses)) {\n            var parse = Sk.parse(\"__main__\", source);\n            parses[source] = Sk.astFromParse(parse.cst, \"__main__\", parse.flags);\n        }\n        var ast = parses[source];\n        var visitor = new NodeVisitor();\n        var nonVariables = [];\n        visitor.visit_Call = function(node) {\n            var func = node.func;\n            var args = node.args;\n            if (func._astname == 'Name' && func.id.v == 'print') {\n                for (var i =0; i < args.length; i+= 1) {\n                    if (args[i]._astname != \"Name\") {\n                        nonVariables.push(args[i]);\n                    }\n                }\n            }\n            this.generic_visit(node);\n        }\n        visitor.visit(ast);\n        return nonVariables;\n    }\n    \n    /**\n     * Skulpt function to iterate through the final state of\n     * all the variables in the program, and check to see if they have\n     * a given value.\n     */\n '''"