# BNF Syntax Highlighting for VS Code

## Syntax

### Notation Rules
- An identifier can be either a character or a symbol in the language/expression
- Identifiers can contain alphanumeric characters, underscores, and hyphens
- When an identifier appears on the left-hand side (LHS) of a rule, it becomes a symbol for the entire file
- Multiple elements in an expression must be separated by commas
- Operators (+, *, |) and parentheses can be used for grouping and repetition

### BNF Grammar

```bnf
<syntax>     ::= <rule> | <rule> <syntax>
<rule>       ::= <identifier> "::=" <expression> ";"
<expression> ::= <term> | <term> "|" <expression>
<term>       ::= <factor> | <factor> "," <term>
<factor>     ::= <identifier> | "(" <expression> ")" | <factor> "*" | <factor> "+"
<identifier> ::= [a-zA-Z][a-zA-Z0-9_-]*
```

Note: Single-line comments are supported using //

## Features (Semantic Highlighting)

1. Displays symbols in the outline view (symbols are identifiers that appear on the LHS of rules)
2. Shows "characters" in the outline view (characters are identifiers that never appear on the LHS)
3. Highlights characters using color scheme 1
4. Highlights symbols using color scheme 2
5. Supports navigation to symbol definitions
6. Provides hover information showing the right-hand side (RHS) of symbol definitions


## Installation

1. Clone or download this repository
2. Execute `npm i` in the cloned repository directory
3. Open the folder in VS Code
4. Open the **Run and Debug** panel (Ctrl+Shift+D or Cmd+Shift+D)
5. Select **Launch Extension** and press the run button
