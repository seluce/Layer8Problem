"""
Stations-Icons für den Party-Vorraum, in der Machart des Bestands.

Gemessen an ui_message, set_keys, set_textsize und ui_globe:
  256x256 RGBA, transparent, verlustfrei (VP8L)
  Kontur #141A24, außen 10 px, kein Schatten
  flache Füllungen aus der Tailwind-Palette
  Inhaltsrahmen rund (24,24)-(232,232)

Gezeichnet wird bei 4x und danach heruntergerechnet; der Rahmen wird zum
Schluss auf denselben Rand gebracht wie der Bestand.
"""
import sys
from PIL import Image, ImageDraw

S = 4
N = 256 * S
W = 5 * S                       # halbe Konturbreite -> 10 px außen
ZIEL = __import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)), '..', '..', 'public', 'assets', 'img', 'party') + '/'

STROKE = (20, 26, 36, 255)      # #141A24
LEER   = (0, 0, 0, 0)
AMBER  = (251, 191, 36, 255)    # amber-400
AMBER2 = (245, 158, 11, 255)    # amber-500
LIGHT  = (241, 245, 249, 255)   # slate-100
SLATE2 = (226, 232, 240, 255)   # slate-200
SLATE3 = (203, 213, 225, 255)   # slate-300
SLATE4 = (148, 163, 184, 255)   # slate-400
BLUE   = (96, 165, 250, 255)    # blue-400
GREEN  = (16, 185, 129, 255)    # emerald-500, wie ui_knowledge
GREEN2 = (52, 211, 153, 255)    # emerald-400
VIOLET = (167, 139, 250, 255)   # violet-400
VIOLET2 = (221, 214, 254, 255)  # violet-200
ROSE   = (251, 113, 133, 255)   # rose-400
ROSE2  = (244, 63, 94, 255)     # rose-500
ORANGE = (249, 115, 22, 255)    # orange-500


def rr(d, box, r, fill, grow=0):
    x0, y0, x1, y1 = [v * S for v in box]
    d.rounded_rectangle((x0 - grow, y0 - grow, x1 + grow, y1 + grow),
                        radius=r * S + grow, fill=fill)


def ell(d, box, fill, grow=0):
    x0, y0, x1, y1 = [v * S for v in box]
    d.ellipse((x0 - grow, y0 - grow, x1 + grow, y1 + grow), fill=fill)


def poly(d, punkte, fill, grow=0):
    cx = sum(p[0] for p in punkte) / len(punkte)
    cy = sum(p[1] for p in punkte) / len(punkte)
    f = 1 + grow / (30 * S)
    d.polygon([((cx + (px - cx) * f) * 1, (cy + (py - cy) * f) * 1)
               for px, py in [(a * S, b * S) for a, b in punkte]], fill=fill)


def rahmen(img, rand=24):
    """Auf denselben Rand bringen wie der Bestand."""
    ziel = (256 - 2 * rand) * S
    inhalt = img.crop(img.getbbox())
    w, h = inhalt.size
    f = ziel / max(w, h)
    inhalt = inhalt.resize((round(w * f), round(h * f)), Image.LANCZOS)
    aus = Image.new('RGBA', (N, N), LEER)
    aus.alpha_composite(inhalt, ((N - inhalt.width) // 2, (N - inhalt.height) // 2))
    return aus.resize((256, 256), Image.LANCZOS)


def sichern(img, name):
    rahmen(img).save(ZIEL + name + '.webp', 'WEBP', lossless=True, quality=100, method=6)
    print('  geschrieben:', name)


# ---------------------------------------------------------------- bar
def bar():
    img = Image.new('RGBA', (N, N), LEER)
    d = ImageDraw.Draw(img)
    # Henkel zuerst: Ring zeichnen, Loch durchstanzen, danach deckt der
    # Krugkörper die linke Ringhälfte zu.
    rr(d, (166, 96, 232, 188), 24, STROKE, grow=W)
    rr(d, (166, 96, 232, 188), 24, STROKE)
    rr(d, (180, 112, 218, 172), 14, LEER)
    # Krug
    rr(d, (44, 46, 176, 214), 16, STROKE, grow=W)
    rr(d, (44, 46, 176, 214), 16, AMBER)
    # Schaumkrone
    rr(d, (44, 46, 176, 104), 16, LIGHT)
    d.rectangle([44 * S, 92 * S, 176 * S, 104 * S], fill=LIGHT)
    d.rectangle([44 * S, 98 * S, 176 * S, 104 * S + W], fill=STROKE)
    # zwei Perlen, damit es nicht wie ein Saftglas aussieht
    ell(d, (68, 132, 92, 156), AMBER2)
    ell(d, (118, 166, 138, 186), AMBER2)
    return img


# ------------------------------------------------------------- toilet
def toilet():
    """Im Profil, nicht von oben.

    Von oben ergibt sich bei 24 px ein blauer Fleck in einem weißen Oval —
    im Vergleich mit dem Emoji nachgemessen und verworfen. Die Silhouette aus
    hohem Kasten links und auskragender Schüssel rechts bleibt auch klein
    eindeutig.
    """
    img = Image.new('RGBA', (N, N), LEER)
    d = ImageDraw.Draw(img)
    # Spülkasten, hochkant links
    rr(d, (34, 22, 108, 130), 12, STROKE, grow=W)
    rr(d, (34, 22, 108, 130), 12, SLATE3)
    d.rectangle([54 * S, 44 * S, 88 * S, 54 * S], fill=SLATE4)      # Drückerplatte
    # Sockel: Säule und Fuß als Rundrechtecke — beim Trapez lief das
    # Konturwachstum vom Schwerpunkt aus schief und ließ einen dunklen Keil
    # stehen. Zwei Rechtecke wachsen exakt.
    rr(d, (82, 150, 148, 214), 8, STROKE, grow=W)
    rr(d, (82, 150, 148, 214), 8, SLATE3)
    rr(d, (64, 204, 166, 232), 8, STROKE, grow=W)
    rr(d, (64, 204, 166, 232), 8, SLATE3)
    # Schüssel, kragt nach rechts aus
    rr(d, (52, 118, 208, 168), 24, STROKE, grow=W)
    rr(d, (52, 118, 208, 168), 24, SLATE2)
    # Deckel als schmaler Streifen obenauf
    rr(d, (58, 112, 202, 134), 11, STROKE, grow=W // 2)
    rr(d, (58, 112, 202, 134), 11, LIGHT)
    return img


def pie(d, box, a0, a1, fill, grow=0):
    x0, y0, x1, y1 = [v * S for v in box]
    d.pieslice((x0 - grow, y0 - grow, x1 + grow, y1 + grow), a0, a1, fill=fill)


def bogen(d, box, a0, a1, farbe, breite):
    x0, y0, x1, y1 = [v * S for v in box]
    d.arc((x0, y0, x1, y1), a0, a1, fill=farbe, width=breite)


# ------------------------------------------------------------- buffet
def buffet():
    """Schüssel mit Grünzeug. Kein Besteck — das ist act_lunch."""
    img = Image.new('RGBA', (N, N), LEER)
    d = ImageDraw.Draw(img)
    # Grünzeug zuerst, die Schüssel deckt die Unterkanten zu
    for box in ((58, 62, 122, 122), (100, 44, 168, 116), (146, 68, 202, 124)):
        ell(d, box, STROKE, grow=W)
    for box, farbe in (((58, 62, 122, 122), GREEN), ((100, 44, 168, 116), GREEN2),
                       ((146, 68, 202, 124), GREEN)):
        ell(d, box, farbe)
    # Schüssel als untere Hälfte einer Ellipse
    pie(d, (34, 62, 222, 216), 0, 180, STROKE, grow=W)
    pie(d, (34, 62, 222, 216), 0, 180, SLATE3)
    # Rand als eigener Streifen, sonst franst die Schnittkante aus
    rr(d, (34, 100, 222, 126), 13, STROKE, grow=W // 2)
    rr(d, (34, 100, 222, 126), 13, SLATE2)
    return img


# -------------------------------------------------------------- dance
def dance():
    """Discokugel. Eine tanzende Figur wird bei 24 px zum Fleck."""
    img = Image.new('RGBA', (N, N), LEER)
    d = ImageDraw.Draw(img)
    rr(d, (120, 18, 136, 66), 6, STROKE, grow=W)      # Aufhängung
    rr(d, (120, 18, 136, 66), 6, SLATE4)
    rr(d, (96, 16, 160, 34), 8, STROKE, grow=W)
    rr(d, (96, 16, 160, 34), 8, SLATE3)
    ell(d, (44, 62, 212, 230), STROKE, grow=W)        # Kugel
    ell(d, (44, 62, 212, 230), VIOLET)
    # Facetten auf eigener Ebene und mit der Kugel als Maske, sonst stehen
    # die Streifen über den Rand hinaus.
    maske = Image.new('L', (N, N), 0)
    ImageDraw.Draw(maske).ellipse((44 * S, 62 * S, 212 * S, 230 * S), fill=255)
    netz = Image.new('RGBA', (N, N), LEER)
    nd = ImageDraw.Draw(netz)
    for y in (108, 148, 188):
        nd.rectangle([40 * S, y * S, 216 * S, (y + 7) * S], fill=VIOLET2)
    for x in (92, 132, 172):
        nd.rectangle([x * S, 58 * S, (x + 7) * S, 234 * S], fill=VIOLET2)
    img.paste(netz, (0, 0), Image.composite(netz.split()[3], Image.new('L', (N, N), 0), maske))
    return img


# ------------------------------------------------------------- lounge
def lounge():
    """Sessel. Die Zimmerpflanze des Emojis ist bei 24 px zu dünn."""
    img = Image.new('RGBA', (N, N), LEER)
    d = ImageDraw.Draw(img)
    rr(d, (56, 40, 200, 150), 26, STROKE, grow=W)     # Rückenlehne
    rr(d, (56, 40, 200, 150), 26, ROSE)
    rr(d, (30, 104, 74, 196), 18, STROKE, grow=W)     # Armlehnen
    rr(d, (30, 104, 74, 196), 18, ROSE2)
    rr(d, (182, 104, 226, 196), 18, STROKE, grow=W)
    rr(d, (182, 104, 226, 196), 18, ROSE2)
    rr(d, (44, 132, 212, 196), 20, STROKE, grow=W)    # Sitzfläche
    rr(d, (44, 132, 212, 196), 20, ROSE)
    rr(d, (54, 190, 78, 226), 6, STROKE, grow=W)      # Füße
    rr(d, (54, 190, 78, 226), 6, SLATE4)
    rr(d, (178, 190, 202, 226), 6, STROKE, grow=W)
    rr(d, (178, 190, 202, 226), 6, SLATE4)
    return img


# ------------------------------------------------------------ outside
def outside():
    """Zigarette mit Rauch. Waagerecht und dick, sonst verschwindet sie."""
    img = Image.new('RGBA', (N, N), LEER)
    d = ImageDraw.Draw(img)
    # Rauch als ein durchgehender Linienzug entlang einer Sinuswelle. Zwei
    # aneinandergesetzte Bögen ergaben lose Haken — PIL setzt sie nicht
    # zusammen, und runde Enden kennt arc() ohnehin nicht.
    import math
    punkte = []
    for i in range(41):
        t = i / 40
        y = 150 - t * 116
        x = 196 + 30 * math.sin(t * 2.4 * math.pi)
        punkte.append((x * S, y * S))
    for farbe, breite in ((STROKE, 13 * S), (SLATE3, 7 * S)):
        d.line(punkte, fill=farbe, width=breite, joint='curve')
        for px, py in (punkte[0], punkte[-1]):          # runde Enden von Hand
            d.ellipse((px - breite / 2, py - breite / 2,
                       px + breite / 2, py + breite / 2), fill=farbe)
    rr(d, (28, 156, 228, 206), 12, STROKE, grow=W)         # Zigarette
    rr(d, (28, 156, 228, 206), 12, LIGHT)
    rr(d, (28, 156, 86, 206), 12, STROKE, grow=W)          # Filter
    rr(d, (28, 156, 86, 206), 12, AMBER2)
    rr(d, (196, 156, 228, 206), 12, STROKE, grow=W)        # Glut
    rr(d, (196, 156, 228, 206), 12, ORANGE)
    return img


if __name__ == '__main__':
    import os
    os.makedirs(ZIEL, exist_ok=True)
    for fn, name in ((bar, 'bar'), (buffet, 'buffet'), (dance, 'dance'),
                     (lounge, 'lounge'), (outside, 'outside'), (toilet, 'toilet')):
        sichern(fn(), name)
