import urllib.request, re

with open('src/app/home/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

urls = re.findall(r'img:\s*\"(https://upload.wikimedia.org/wikipedia/commons/[^\"]+)\"', content)

bad = []
for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        res = urllib.request.urlopen(req)
        print(f'OK: {url}')
    except Exception as e:
        print(f'BAD: {url} - {e}')
        bad.append(url)

if not bad:
    print('ALL GOOD')
