from PIL import Image
import numpy as np
from shapely.geometry import box
from shapely.ops import unary_union

im = Image.open('c:/PROJECTS/new portfolio/portfolio-azmaeen-mahtab-ezaz/public/logo.png')
alpha = np.array(im)[:,:,3]

boxes = []
for y in range(260, 766):
    row = alpha[y, :] > 128
    if not np.any(row):
        continue
    runs = []
    start = None
    for x in range(len(row)):
        if row[x] and start is None:
            start = x
        elif not row[x] and start is not None:
            runs.append((start, x))
            start = None
    if start is not None:
        runs.append((start, len(row)))
    for x0, x1 in runs:
        boxes.append(box(x0, y, x1, y + 1))

poly = unary_union(boxes).simplify(0.8)

# Convert each geom to SVG path d string
paths = []
for g in poly.geoms:
    coords = list(g.exterior.coords)
    d = f"M {coords[0][0]:.1f} {coords[0][1]:.1f}"
    for x, y in coords[1:]:
        d += f" L {x:.1f} {y:.1f}"
    d += " Z"
    paths.append(d)

full_d = " ".join(paths)

svg_1024 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
  <path fill-rule="evenodd" clip-rule="evenodd" d="{full_d}" />
</svg>
'''

with open('c:/PROJECTS/new portfolio/portfolio-azmaeen-mahtab-ezaz/public/logo.svg', 'w') as f:
    f.write(svg_1024)

# Tight viewBox version
paths_tight = []
for g in poly.geoms:
    coords = list(g.exterior.coords)
    d = f"M {coords[0][0]-185:.1f} {coords[0][1]-260:.1f}"
    for x, y in coords[1:]:
        d += f" L {x-185:.1f} {y-260:.1f}"
    d += " Z"
    paths_tight.append(d)

tight_d = " ".join(paths_tight)
svg_tight = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 655 505" fill="currentColor">
  <path fill-rule="evenodd" clip-rule="evenodd" d="{tight_d}" />
</svg>
'''

with open('c:/PROJECTS/new portfolio/portfolio-azmaeen-mahtab-ezaz/public/logo-tight.svg', 'w') as f:
    f.write(svg_tight)

print("SVG files generated successfully!")

