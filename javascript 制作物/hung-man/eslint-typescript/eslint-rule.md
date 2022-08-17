# root

ESLint の仕様では、
eslint コマンドを実行したディレクトリを起点に、ディレクトリ b を遡って設定ファイルを探す。

この時、設定ファイルが複数あると、不要な設定ファイルまで見に行ってしまう危険が生じる。
そこで **root: true**としておくと、設定ファイルを発見した際、
それ以上ディレクトリを遡らなくなる。

---

# env

ESLint のチェック対象の Typescript・Javascript がどの実行環境で使われるのかを ESlint に伝えるオプション。

---

# parserOptions

## ecmaVersion

チェック対象の Javascript がどの構文を使っているかを ESlint に伝えるオプション。

---

## sourceType

Javascript にはスクリプトモードとモジュールモードの２種類があり、そのどちらのモードを利用するかを ESLint に伝えるオプション。
デフォルトはスクリプトモード。しかし、実務で開発する場合はモジュールモードが普通になるので、モジュールモードに指定するのが無難。

---

# parser

parser で設定したパーサーを使用して、ESLint は javascript や Typescript の構文を分析する。
この指定がないと、ESLint は Typescript を解釈できない。

---

# plugin

ESLint 公式ではなく、第三者が作成したルールを追加するのに使用するオプション。

---

# parserOptions

## project

ESLint 実行時に使うコンパイラ設定ファイルを、tsconfigRootDir からの相対パスで指定する。

---

## tsconfigRootDir

プロジェクトルートの絶対パスを指定する。

---

# ignorePatterns

ESLint のチェック対象外にするファイルやディレクトリを指定するオプション。
Typescript では、コンパイルで生成した Javascript はリントしないのが普通なので、dist を対象外に指定することが多い。

---

# extends

shareable config を使うための設定。

---

# rules

shareable config で有効化されたルールを上書きするのに使用するオプション。

---
