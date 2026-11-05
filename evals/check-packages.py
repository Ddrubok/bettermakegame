"""Maintainer-only standard-library checks. Does not evaluate skill behavior."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

def check(repo, runtime):
    failures = []
    count = 0
    if not (runtime / 'LICENSE').is_file():
        failures.append(f'{runtime}: missing LICENSE')
    elif (runtime / 'LICENSE').read_bytes() != (repo / 'LICENSE').read_bytes():
        failures.append(f'{runtime}: LICENSE differs from root')
    for forbidden in ('evals', 'docs', '.git', 'node_modules'):
        if (runtime / forbidden).exists() and runtime != repo:
            failures.append(f'{runtime}: unexpected runtime directory {forbidden}')
    # game-vfx is a source repository with optional examples; select installed roots explicitly.
    files = [runtime / 'SKILL.md']
    for sub in ('references', 'assets', 'agents'):
        if (runtime / sub).exists():
            files.extend((runtime / sub).rglob('*.md'))
    for file in files:
        text = file.read_text(encoding='utf-8')
        for target in re.findall(r'\[[^\]\n]*\]\(([^)]+)\)', text):
            target = target.strip().split(' "')[0].strip('<>')
            parsed = urlsplit(target)
            if parsed.scheme or target.startswith('#'):
                continue
            dest = (file.parent / unquote(parsed.path)).resolve()
            count += 1
            if not dest.is_relative_to(runtime.resolve()) or not dest.exists():
                failures.append(f'{file}: missing or escaping runtime link {target}')
    return failures, count

def main():
    if len(sys.argv) != 4:
        raise SystemExit('Usage: python check-packages.py BMG_REPO VFX_REPO KGS_REPO')
    repos = [Path(arg).resolve() for arg in sys.argv[1:]]
    runtimes = [repos[0] / 'skills/bettermakegame', repos[1], repos[2] / 'skills/kill-game-slop']
    failures, links = [], 0
    for repo, runtime in zip(repos, runtimes):
        errors, count = check(repo, runtime)
        failures.extend(errors)
        links += count
    for error in failures:
        print(error)
    print(f'{len(repos)} packages, {links} local file links, {len(failures)} failures; semantics NOT evaluated')
    raise SystemExit(bool(failures))

if __name__ == '__main__':
    main()
