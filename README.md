# barifac

高専生のための単位計算サービス

## Setup Procedure

初回は以下の手順を全て行う。  
次回以降は、基本的に"Server Startup"のみを行う。(ただし、依存関係や DB に変更があった場合は、適宜"Container Setup"の対応する手順を行う)

### Initialize

1. clone this repository
1. `cd barifac`
1. `npm install`
1. python の仮想環境を作成
   1. `python -m venv venv`
   1. `source venv/bin/activate`
   1. `pip install -r requirements.txt`
1. 環境変数ファイルを追加 (tmpl を参考に作成し、足りない情報は slack で確認)
   - add fastapi/fastapi.env
1. firebase の credentials.json を追加 (Slack などで共有してもらう)
   - add fastapi/firebase_credentials.json

### Container Setup

1. コンテナ ボリューム ネットワーク作成・起動

```sh
docker-compose up -d
```

2. 依存パッケージのインストール

```sh
docker-compose run fastapi poetry install
```

3. DB migrate

```sh
docker-compose run fastapi poetry run alembic upgrade head
```

### Server Startup

```sh
docker-compose run -p 8000:8000 fastapi ./scripts/server
```

(実行権限がなければ `sudo chmod +x ./fastapi/scripts/server` で付与する)

## linter/formatter 初期設定

commit 時に linter/formatter が自動的に走るように設定をする。

1. python の環境を local に構築(OS,宗教によって環境構築の仕方が異なるので割愛)
1. node, npm の環境を local に構築(OS,宗教によって環境構築の仕方が異なるので割愛)
   - このプロジェクトでは yarn ではな npm を用いる。深い理由はない。
1. root(README.md と同階層)で`npm install`で必要なパッケージをインストール
   - `package-lock.json`は自分で編集してはいけないファイルであり、git 管理をする必要があります。編集・消去しないで commit してください。
1. root(README.md と同階層)で`pip install -r requirements.txt`で必要なパッケージをインストール

linter/formatter は staged file のみに走ります。linter/formatter を走らせたくない場合は、`--no-verify`を commit 時にオプションで指定してください。
