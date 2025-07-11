# bnf highlight vscode

## Installation

1. Clone or download this repository.
2. Open the folder in VS Code.
3. Open the **Run and Debug** panel (Ctrl+Shift+D or Cmd+Shift+D).
4. Select **Launch Extension** and press F5 to start the Extension Development Host with the extension enabled.
5. Alternatively, run `vsce package` to create a `.vsix` file and install it via the Extensions: Install from VSIX... command.

## Syntax

### List of Notation
- identifier is either a character or a symbol in the language or expression. alphanumerics and _ and - can be used.
- if a identifier once appears on a lhs, it is symbol across the file.
- subsquent character is separated by comma
- +, *, |, and parenthesis can be used.

### BNF Grammar

```bnf
<syntax>     ::= <rule> | <rule> <syntax>
<rule>       ::= <identifier> "::=" <expression> ";"
<expression> ::= <term> | <term> "|" <expression>
<term>       ::= <factor> | <factor> "," <term>
<factor>     ::= <identifier> | "(" <expression> ")" | <factor> "*" | <factor> "+"
<identifier> ::= [a-zA-Z][a-zA-Z0-9_-]*
```

Ignore single line commments //


## Functionality (semantic highlighting)

1. finds symbols and show them in outlines. symbols are identifiers that appear on lhs.
2. finds "characters" (in the language defined by a BNF file) and show them in outlines. characters are idenfitifiers that never appear on lhs.
3. Character is colored by color 1.
4. Symbol is colored by color 2.
5. Symbol can be jumped to the definition. 
6. Hovering symbol shows rhs of a symbol defitnition.