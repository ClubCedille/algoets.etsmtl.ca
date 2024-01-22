---
title: Expérimentation des indicateurs technique
page-name: "Backtesting"
background-image-url: "images/blog/vol/nombre_de_vol_de_vehicule_moteur_par_annee_hua975f8a3d854aa424a332774bd6b821d_25312_1024x0_resize_q75_box.jpg"
facebook-link :
twitter-link : 
linkedin-link : 
tags : [ "Données publique", "Indicateurs Technique", "Python"]
author : Antoine Boucher
author-title : Co-Capitaine
author-role : Rechercheur des données
author-img : images/team/team-3.png
date : 1 janvier 2024
---

## Expérimentation des indicateurs technique

### Introduction

Dans ce rapport, nous présentons une expérimentation des indicateurs techniques à l'aide du projet BatchBacktesting disponible sur GitHub à l'adresse suivante :

```bash
!pip install numpy httpx rich
```

```python
import pandas as pd
import numpy as np
from datetime import datetime
import sys
import os
import httpx

import concurrent.futures
from datetime import datetime
import glob
import warnings
from rich.progress import track
warnings.filterwarnings("ignore")
```

### API

N'oubliez pas de remplacer les espaces réservés FMP_API_KEY et BINANCE_API_KEY par vos véritables clés API pour pouvoir accéder aux données des services respectifs.

```python
BASE_URL_FMP = "https://financialmodelingprep.com/api/v3"
BASE_URL_BINANCE = "https://fapi.binance.com/fapi/v1/"
FMP_API_KEY = ""
BINANCE_API_KEY = ""
```

Plusieurs fonctions pour effectuer des requêtes API et fournit une liste de cryptomonnaies prises en charge.  

Ce script propose des fonctions pour :

1. Effectuer des requêtes API vers différents points de terminaison.
2. Obtenir des données historiques de prix pour les cryptomonnaies et les actions.
3. Obtenir la liste des actions du S&P 500.
4. Obtenir toutes les cryptomonnaies prises en charge.
5. Obtenir les listes des états financiers.

```python
def make_api_request(api_endpoint, params):
    with httpx.Client() as client:
        # Make the GET request to the API
        response = client.get(api_endpoint, params=params)
        if response.status_code == 200:
            return response.json()
        print("Error: Failed to retrieve data from API")
        return None
```

La fonction make_api_request() effectue une requête GET vers l'API et renvoie les données au format JSON si la requête est réussie. Sinon, elle renvoie None.

```python
def get_historical_price_full_crypto(symbol):
    api_endpoint = f"{BASE_URL_FMP}/historical-price-full/crypto/{symbol}"
    params = {"apikey": FMP_API_KEY}
    return make_api_request(api_endpoint, params)


def get_historical_price_full_stock(symbol):
    api_endpoint = f"{BASE_URL_FMP}/historical-price-full/{symbol}"
    params = {"apikey": FMP_API_KEY}

    return make_api_request(api_endpoint, params)

def get_SP500():
    api_endpoint = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    data = pd.read_html(api_endpoint)
    return list(data[0]['Symbol'])


def get_all_crypto():
    """
    All possible crypto symbols
    """
    return [
        "BTCUSD",
        "ETHUSD",
        "LTCUSD",
        "BCHUSD",
        "XRPUSD",
        "EOSUSD",
        "XLMUSD",
        "TRXUSD",
        "ETCUSD",
        "DASHUSD",
        "ZECUSD",
        "XTZUSD",
        "XMRUSD",
        "ADAUSD",
        "NEOUSD",
        "XEMUSD",
        "VETUSD",
        "DOGEUSD",
        "OMGUSD",
        "ZRXUSD",
        "BATUSD"
        "USDTUSD",
        "LINKUSD",
        "BTTUSD",
        "BNBUSD",
        "ONTUSD",
        "QTUMUSD",
        "ALGOUSD",
        "ZILUSD",
        "ICXUSD",
        "KNCUSD",
        "ZENUSD",
        "THETAUSD",
        "IOSTUSD",
        "ATOMUSD",
        "MKRUSD",
        "COMPUSD",
        "YFIUSD",
        "SUSHIUSD",
        "SNXUSD",
        "UMAUSD",
        "BALUSD",
        "AAVEUSD",
        "UNIUSD",
        "RENBTCUSD",
        "RENUSD",
        "CRVUSD",
        "SXPUSD",
        "KSMUSD",
        "OXTUSD",
        "DGBUSD",
        "LRCUSD",
        "WAVESUSD",
        "NMRUSD",
        "STORJUSD",
        "KAVAUSD",
        "RLCUSD",
        "BANDUSD",
        "SCUSD",
        "ENJUSD",
    ]

def get_financial_statements_lists():
    api_endpoint = f"{BASE_URL_FMP}/financial-statement-symbol-lists"
    params = {"apikey": FMP_API_KEY}
    return make_api_request(api_endpoint, params)

def get_Vanguard_Canada():
    """
    Get Vanguard Canada companies

    Returns:
        dict: Dictionary containing the data
    """
        # VCN: Vanguard FTSE Canada All Cap Index ETF
        # VFV: Vanguard S&P 500 Index ETF
        # VUN: Vanguard US Total Market Index ETF
        # VEE: Vanguard FTSE Emerging Markets All Cap Index ETF
        # VAB: Vanguard Canadian Aggregate Bond Index ETF
        # VSB: Vanguard Canadian Short-Term Bond Index ETF
        # VXC: Vanguard FTSE Global All Cap ex Canada Index ETF
        # VIU: Vanguard FTSE Developed All Cap ex North America Index ETF
        # VGG: Vanguard US Dividend Appreciation Index ETF
    return ['VCN', 'VFV', 'VUN', 'VEE', 'VAB', 'VSB', 'VXC', 'VIU', 'VGG']
```

La fonction get_historical_price_full_crypto() effectue une requête API vers l'API FMP pour obtenir les données historiques de prix pour une cryptomonnaie spécifique. La fonction get_historical_price_full_stock() effectue une requête API vers l'API FMP pour obtenir les données historiques de prix pour une action spécifique. La fonction get_SP500() effectue une requête API vers Wikipedia pour obtenir la liste des actions du S&P 500. La fonction get_all_crypto() renvoie la liste de toutes les cryptomonnaies prises en charge. La fonction get_financial_statements_lists() effectue une requête API vers l'API FMP pour obtenir la liste des états financiers. La fonction get_Vanguard_Canada() renvoie la liste des actions de Vanguard Canada.  

Pour utiliser ce script dans votre projet, copiez simplement assurez-vous d'avoir installé les bibliothèques requises mentionnées dans la section "Exigences" de la documentation BatchBacktesting. Ensuite, vous pouvez importer les fonctions de ce script dans votre script principal ou votre Jupyter Notebook pour accéder et manipuler les données comme vous le souhaitez.  

Une fois que vous avez les données, vous pouvez utiliser la bibliothèque BatchBacktesting pour tester diverses stratégies sur les actions ou les cryptomonnaies, analyser les résultats et visualiser les performances. À titre d'exemple, nous avons utilisé la stratégie EMA (Exponential Moving Average) pour effectuer des tests de performance sur les actions du S&P 500 et les cryptomonnaies prises en charge.

### EMA Stratégie

L'EMA est un indicateur technique qui est utilisé pour lisser l'action des prix en filtrant le "bruit" des fluctuations de prix aléatoires à court terme. Il est calculé en prenant le prix moyen d'un titre sur un nombre spécifique de périodes de temps. L'EMA est un type de moyenne mobile qui accorde un poids et une signification plus importants aux points de données les plus récents. La moyenne mobile exponentielle est également appelée moyenne mobile pondérée exponentiellement.

```python
class EMA(Strategy):
    n1 = 20
    n2 = 80
    n3 = 150

    def init(self):
        close = self.data.Close
        self.ema20 = self.I(taPanda.ema, close.s, self.n1)
        self.ema80 = self.I(taPanda.ema, close.s, self.n2)
        self.ema150 = self.I(taPanda.ema, close.s, self.n3)

    def next(self):
        price = self.data.Close
        if crossover(self.ema20, self.ema80):
            self.position.close()
            self.buy(sl=0.90 * price, tp=1.25 * price)

        elif crossover(self.ema80, self.ema20):
            self.position.close()
            self.sell(sl=1.10 * price, tp=0.75 * price)
```

La stratégie EMA est implémentée dans la classe EMA. La stratégie EMA est une stratégie de suivi de tendance qui utilise trois moyennes mobiles exponentielles (EMA) avec des périodes de 20, 80 et 150. Lorsque la moyenne mobile exponentielle à court terme (20) croise la moyenne mobile exponentielle à long terme (80) par le haut, cela signifie que la tendance est à la hausse et que nous devrions acheter. Lorsque la moyenne mobile exponentielle à court terme (20) croise la moyenne mobile exponentielle à long terme (80) par le bas, cela signifie que la tendance est à la baisse et que nous devrions vendre.

```python
def run_backtests_strategies(instruments, strategies):
    """
    Run backtests for a list of instruments using a specified strategy.

    Args:
        instruments (list): List of instruments to run backtests for
        strategies (list): List of strategies to run backtests for

    Returns:
        List of outputs from run_backtests()

    """

    # find strategies in the STRATEGIES
    strategies = [x for x in STRATEGIES if x.__name__ in strategies]
    outputs = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = []
        for strategy in strategies:
            future = executor.submit(run_backtests, instruments, strategy, 4)
            futures.append(future)

        for future in concurrent.futures.as_completed(futures):
            outputs.extend(future.result())

    return outputs

def check_crypto(instrument):
    """
    Check if the instrument is crypto or not
    """
    return instrument in get_all_crypto()

def check_stock(instrument):
    """
    Check if the instrument is crypto or not
    """
    return instrument not in get_financial_statements_lists()


def process_instrument(instrument, strategy):
    """
    Process a single instrument for a backtest using a specified strategy.
    Returns a Pandas dataframe of the backtest results.
    """
    try:

        if check_crypto(instrument):
            data = get_historical_price_full_crypto(instrument)
        else:
            data = get_historical_price_full_stock(instrument)

        if data is None or "historical" not in data:
            print(f"Error processing {instrument}: No data")
            return None

        data = clean_data(data)

        bt = Backtest(
            data, strategy=strategy, cash=100000, commission=0.002, exclusive_orders=True
        )
        output = bt.run()
        output = process_output(output, instrument, strategy)
        return output, bt
    except Exception as e:
        print(f"Error processing {instrument}: {str(e)}")
        return None

def clean_data(data):
    """
    Clean historical price data for use in a backtest.
    Returns a Pandas dataframe of the cleaned data.
    """
    data = data["historical"]
    data = pd.DataFrame(data)
    data.columns = [x.title() for x in data.columns]
    data = data.drop(
        [
            "Adjclose",
            "Unadjustedvolume",
            "Change",
            "Changepercent",
            "Vwap",
            "Label",
            "Changeovertime",
        ],
        axis=1,
    )
    data["Date"] = pd.to_datetime(data["Date"])
    data.set_index("Date", inplace=True)
    data = data.iloc[::-1]
    return data


def process_output(output, instrument, strategy, in_row=True):
    """
    Process backtest output data to include instrument name, strategy name,
    and parameters.
    Returns a Pandas dataframe of the processed output.
    """
    if in_row:
        output = pd.DataFrame(output).T
    output["Instrument"] = instrument
    output["Strategy"] = strategy.__name__
    output.pop("_strategy")
    return output


def save_output(output, output_dir, instrument, start, end):
    """
    Save backtest output to file and generate chart if specified.
    """
    print(f"Saving output for {instrument}")
    fileNameOutput = f"{output_dir}/{instrument}-{start}-{end}.csv"
    output.to_csv(fileNameOutput)


def plot_results(bt, output_dir, instrument, start, end):
    print(f"Saving chart for {instrument}")
    fileNameChart = f"{output_dir}/{instrument}-{start}-{end}.html"
    bt.plot(filename=fileNameChart, open_browser=False)

def run_backtests(instruments, strategy, num_threads=4, generate_plots=False):
    """
    Run backtests for a list of instruments using a specified strategy.
    Returns a list of Pandas dataframes of the backtest results.

    Args:
        instruments (list): List of instruments to run backtests for

    Returns:
        List of Pandas dataframes of the backtest results
    """
    outputs = []
    output_dir = f"output/raw/{strategy.__name__}"
    output_dir_charts = f"output/charts/{strategy.__name__}"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    if not os.path.exists(output_dir_charts):
        os.makedirs(output_dir_charts)
    with concurrent.futures.ThreadPoolExecutor(max_workers=num_threads) as executor:
        future_to_instrument = {
            executor.submit(process_instrument, instrument, strategy): instrument
            for instrument in instruments
        }
        for future in concurrent.futures.as_completed(future_to_instrument):
            instrument = future_to_instrument[future]
            output = future.result()
            if output is not None:
                outputs.append(output[0])
                save_output(output[0], output_dir, instrument, output[0]["Start"].to_string().strip().split()[1], output[0]["End"].to_string().strip().split()[1])
                if generate_plots:
                    plot_results(output[1], output_dir_charts, instrument, output[0]["Start"].to_string().strip().split()[1], output[0]["End"].to_string().strip().split()[1])
    data_frame = pd.concat(outputs)
    start = data_frame["Start"].to_string().strip().split()[1]
    end = data_frame["End"].to_string().strip().split()[1]
    fileNameOutput = f"output/{strategy.__name__}-{start}-{end}.csv"
    data_frame.to_csv(fileNameOutput)


    return data_frame
```

La fonction run_backtests_strategies() exécute des backtests pour une liste d'instruments en utilisant une stratégie spécifique. La fonction check_crypto() vérifie si l'instrument est une cryptomonnaie ou non. La fonction check_stock() vérifie si l'instrument est une action ou non. La fonction process_instrument() traite un seul instrument pour un backtest en utilisant une stratégie spécifique. La fonction clean_data() nettoie les données historiques des prix pour les utiliser dans un backtest. La fonction process_output() traite les données de sortie du backtest pour inclure le nom de l'instrument, le nom de la stratégie et les paramètres. La fonction save_output() enregistre la sortie du backtest dans un fichier et génère un graphique si spécifié. La fonction plot_results() enregistre la sortie du backtest dans un fichier et génère un graphique si spécifié. La fonction run_backtests() exécute des backtests pour une liste d'instruments en utilisant une stratégie spécifique.  

Le script génère des graphiques pour chaque instrument testé, qui peuvent être visualisés pour analyser les performances des stratégies appliquées. Les résultats sont sauvegardés dans le répertoire output du projet BatchBacktesting.

```python
tickers = get_SP500()
run_backtests(tickers, strategy=EMA, num_threads=12, generate_plots=True)
ticker = get_all_crypto()
run_backtests(ticker, strategy=EMA, num_threads=12, generate_plots=True)
```

Nous avons utilisé la stratégie EMA pour effectuer des tests de performance sur les actions du S&P 500 et les cryptomonnaies prises en charge. Les résultats sont sauvegardés dans le répertoire output du projet BatchBacktesting.  

Le lien que vous avez partagé correspond au répertoire output du projet BatchBacktesting sur GitHub : `https://github.com/AlgoETS/BatchBacktesting/tree/main/output`. Cependant, il semble que ce répertoire ne contient pas de résultats pré-calculés. En effet, il est probable que les auteurs du projet aient choisi de ne pas inclure les résultats des tests dans le dépôt GitHub afin d'éviter d'encombrer le dépôt avec des données spécifiques à chaque utilisateur.  

Pour obtenir des valeurs calculées pour vos propres tests, vous devrez exécuter le script en local sur votre machine avec les paramètres et les stratégies de votre choix. Après avoir exécuté le script, les résultats seront sauvegardés dans le répertoire output de votre projet local. `https://algoets.github.io/BatchBacktesting/output/charts/EMA/AAPL-2018-04-04-2023-04-03.html`

### Analyse

Top 5 des instruments avec le meilleur rendement :

1. BTCBUSD : 293,78%
2. ALB : 205,97%
3. OMGUSD : 199,62%
4. BBWI : 196,82%
5. GRMN : 193,47%

Top 5 des instruments avec le plus faible rendement :

1. BTTBUSD : -99,93%
2. UAL : -82,63%
3. NCLH : -81,51%
4. LNC : -78,02%
5. CHRW : -76,38%

En conclusion, le projet BatchBacktesting offre une approche flexible et puissante pour tester et analyser les performances des indicateurs techniques sur les marchés boursiers et les cryptomonnaies. Les fonctions fournies permettent une intégration facile avec les API de services financiers et une manipulation aisée des données. Les résultats des expérimentations peuvent être utilisés pour développer et affiner des stratégies de trading algorithmique en fonction des performances observées.
