# Portfolio — jak podmieniać zdjęcia i ikony

Ten plik to ściąga: gdzie wgrywać pliki, jak je nazywać, żeby same się podłączyły w kodzie.

## Struktura folderów

```
Twój-folder/
├── index.html
└── images/
    ├── (zdjęcia — patrz lista niżej)
    └── icons/
        └── (ikony sekcji — patrz lista niżej)
```

Obu folderów (`images/` i `images/icons/`) NIE trzeba nic konfigurować w kodzie —
wystarczy, że pliki tam leżą pod właściwą nazwą.

---

## 1. Zdjęcia (`images/`)

Wymagania: dowolny format (jpg/png), min. ~1000–1200px po dłuższym boku,
nie trzeba kadrować — strona sama dopasowuje kadr do kształtu kafelka.

| Sekcja | Nazwy plików |
|---|---|
| To moja działka | `dzialka-1.jpg`, `dzialka-2.jpg`, `dzialka-3.jpg`, `dzialka-4.jpg` |
| Tak to ja | `takto-1.jpg`, `takto-2.jpg`, `takto-3.jpg`, `takto-4.jpg` |
| W co gram | `wcogram-1.jpg`, `wcogram-2.jpg` |
| Mr Toilet | `mrtoilet-1.jpg`, `mrtoilet-2.jpg` |
| Nerd Simulator | `nerdsim-1.jpg`, `nerdsim-2.jpg` |
| Wild Bar | `wildbar-1.jpg` *(tylko jedno zdjęcie)* |
| Space Defense | `spacedefense-1.jpg`, `spacedefense-2.jpg`, `spacedefense-3.jpg` |
| Popiel | `popiel-1.jpg`, `popiel-2.jpg` |
| Indian Lumberjack | `lumberjack-1.jpg`, `lumberjack-2.jpg`, `lumberjack-3.jpg`, `lumberjack-4.jpg` |
| Fluffy Savior | `fluffy-1.jpg`, `fluffy-2.jpg` |
| Simply Signals | `simplysignals-1.png`, `simplysignals-2.png` |
| Runtime Inspector | `runtimeinspector-1.jpg`, `runtimeinspector-2.jpg` |
| Narzędzia edytorskie | `edytorskie-1.png`, `edytorskie-2.png` |
| W rozwoju | `wiprozwoju-1.png`, `wiprozwoju-2.png` |

**Kolejność w nazwach** = kolejność w układzie kafelków (lewo→prawo, góra→dół —
tam gdzie jest to siatka; w kolażach mniej więcej w kolejności "od najbardziej
widocznego").

### Cache-busting (ważne przy podmianie zdjęcia w przyszłości!)

W kodzie każde zdjęcie ma na końcu adresu dopisek `?v=1`, np.:

```
images/dzialka-1.jpg?v=1
```

Jeśli **podmienisz zdjęcie pod tą samą nazwą** w przyszłości, samo podmienienie
pliku może nie wystarczyć — przeglądarki odwiedzających mogą pokazać starą
wersję z pamięci podręcznej. Żeby to wymusić, zmień w kodzie `?v=1` na `?v=2`
przy tym jednym zdjęciu, którego dotyczy zmiana. Reszty nie musisz ruszać.

---

## 2. Ikony sekcji (`images/icons/`)

Każda sekcja ma domyślną, wbudowaną ikonę (narysowaną w kodzie). Jeśli wgrasz
plik o odpowiedniej nazwie do `images/icons/`, **zastąpi on domyślną ikonę
automatycznie** — jeśli pliku nie ma, zostaje ta wbudowana. Nic więcej nie
trzeba zmieniać w kodzie.

**Wymagania:**
- Format: **SVG** (najlepiej) lub **PNG z prawdziwą przezroczystością**. Nigdy JPG.
- Tło musi być **realnie przezroczyste** (nie: rysunek szachownicy jako imitacja
  przezroczystości — to musi być prawdziwy kanał alfa/brak tła w pliku).
- Styl: cienki, jednokolorowy kontur (bez wypełnienia), bez tekstu w środku.
- Kolor: najbezpieczniej **biały** (`#FFFFFF`) lub bardzo jasny szary —
  ikony i tak wyświetlają się na stronie mocno wytłumione (~16% przezroczystości).
- Najlepiej plik kwadratowy (np. 500×500px).

| Nazwa pliku | Sekcja |
|---|---|
| `hero.svg` | Start |
| `career.svg` | Kariera |
| `skills.svg` | Umiejętności |
| `project-1.svg` | Mr Toilet |
| `project-2.svg` | Nerd Simulator |
| `project-3.svg` | Wild Bar |
| `project-4.svg` | Space Defense |
| `project-5.svg` | Popiel |
| `project-6.svg` | Indian Lumberjack |
| `project-7.svg` | Fluffy Savior |
| `project-8.svg` | Simply Signals |
| `project-9.svg` | Runtime Inspector |
| `project-10.svg` | Narzędzia edytorskie |
| `project-11.svg` | W rozwoju |
| `project-12.svg` | System tras (Oprogramowanie) |
| `about-technical.svg` | To moja działka |
| `about-life.svg` | Tak to ja |
| `about-recommend.svg` | W co gram |
| `contact.svg` | Kontakt |

---

## Szybki checklist przed wgraniem nowego pliku

- [ ] Nazwa pliku dokładnie zgodna z tabelą (wielkość liter też ma znaczenie)
- [ ] Zdjęcia: wgrane do `images/`, ikony: do `images/icons/`
- [ ] Ikony: SVG lub PNG z realną przezroczystością, bez tekstu, bez tła
- [ ] Przy podmianie zdjęcia pod tą samą nazwą → zwiększ `?v=1` → `?v=2` w kodzie
- [ ] Po wgraniu zrób twarde odświeżenie w przeglądarce (Ctrl+Shift+R / Cmd+Shift+R)
