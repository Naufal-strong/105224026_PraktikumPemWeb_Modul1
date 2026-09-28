# Dokumen Teknis Modul 1 — Lingkungan Pengembangan, Git, dan Lalu Lintas HTTP

Nama/NIM   : Naufal Fakhrianto Nugroho / 105224026
Repositori : https://github.com/Naufal-strong/105224026_PraktikumPemWeb_Modul1

## 1. Lingkungan Pengembangan

| Komponen | Versi |
| --- | --- |
| Sistem Operasi | Windows 11 (build 26200.9445) |
| Node.js | v26.7.0 |
| npm | 12.1.0 |
| Git | 2.53.0.windows.1 |
| Visual Studio Code | 1.139.1 |

Untuk melihat versi perangkat, gunakan perintah berikut.

```bash
node -v
npm -v
git --version
code --version
```

Project yang digunakan merupakan project berbasis Next.js dengan TypeScript dan Tailwind CSS. Project dijalankan menggunakan perintah:

```bash
npm run dev
```

## 2. Alur Kerja Git

### Keluaran `git log --oneline --graph`

```
* 8665e7e feat: initialize Next.js project with TypeScript and Tailwind CSS
```

### Tautan pull request

- _(diisi setelah pull request dibuat dan digabungkan)_

## 3. Pengamatan Lalu Lintas HTTP

> Metode pada baris yang diamati melalui `curl -I` tercatat **HEAD** (karena opsi
> `-I` mengirim permintaan HEAD). Pada panel Network DevTools, permintaan dokumen
> dan aset memakai metode **GET**.

### Lembar kerja pengamatan (Tabel 9)

| No | URL | Metode | Kode Status | Content-Type | Header Lain yang Diamati |
| --- | --- | --- | --- | --- | --- |
| 1 | http://localhost:3000/ | GET | 200 OK | `text/html; charset=utf-8` | `X-Powered-By: Next.js`; `Cache-Control: no-cache, must-revalidate`; `Vary: rsc, next-router-state-tree, …`; `Link:` preload dua berkas `.woff2` |
| 2 | http://localhost:3000/halaman-tidak-ada | GET | 404 Not Found | `text/html; charset=utf-8` | `X-Powered-By: Next.js`; `Cache-Control: no-cache, must-revalidate` |
| 3 | http://localhost:3000/_next/static/chunks/[root-of-the-server]__0cbk-n2._.css | GET | 200 OK | `text/css; charset=UTF-8` | `Content-Length: 48366`; `ETag: W/"bcee-1a0e0d6b1ce"`; `Accept-Ranges: bytes` |
| 4 | http://github.com (curl) | HEAD | 301 Moved Permanently | — | `Location: https://github.com/` |
| 5 | https://developer.mozilla.org (dengan cache) | GET | 200 OK | `text/html` | `cf-cache-status: HIT`; `Age: 36`; `last-modified`; kolom `Size`: `(disk cache)` |

### Keluaran `curl -I` dan `curl -v`

`curl -I http://localhost:3000`:

```
HTTP/1.1 200 OK
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
Link: </_next/static/media/797e433ab948586e-s.p.0r6juujl39pe6.woff2>; rel=preload; as="font"; ...,
      </_next/static/media/caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2>; rel=preload; as="font"; ...
Cache-Control: no-cache, must-revalidate
X-Powered-By: Next.js
Content-Type: text/html; charset=utf-8
Connection: keep-alive
```

`curl -I http://github.com`:

```
HTTP/1.1 301 Moved Permanently
Content-Length: 0
Location: https://github.com/
```

`curl -v https://example.com` (baris permintaan diawali `>`, baris respons diawali `<`):

```
> GET / HTTP/1.1
> Host: example.com
> User-Agent: curl/8.21.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: text/html
< Transfer-Encoding: chunked
< Connection: keep-alive
< Server: cloudflare
< last-modified: Sat, 26 Sep 2026 09:10:30 GMT
< allow: GET, HEAD
< Accept-Ranges: bytes
< Age: 0
< cf-cache-status: HIT
< CF-RAY: a4174e5a6f9dfd9b-SIN
```

### Analisis

- **Perbedaan status/ukuran dengan dan tanpa cache:** pada pemuatan pertama
  (cache dinonaktifkan) sumber daya diunduh penuh dari jaringan, sehingga kolom
  `Size` menampilkan ukuran riil. Setelah cache diaktifkan dan halaman dimuat
  ulang, sumber daya dapat tampil `200 (memory cache)` atau `200 (disk cache)`
  tanpa permintaan ulang ke server, atau `304 Not Modified` bila peramban
  memvalidasi ulang salinan ke server. Pada pengamatan saya, dokumen MDN yang
  dimuat ulang tampil `200 OK` dengan `cf-cache-status: HIT` dan kolom `Size`
  menampilkan `(disk cache)`, sedangkan aset statis Next.js muncul sebagai
  `200 (memory cache)` tanpa permintaan ulang ke server.
- **Alasan `curl -I` adalah HEAD:** opsi `-I`/`--head` membuat curl mengirim
  permintaan dengan metode **HEAD**, yaitu seperti GET tetapi server tidak
  mengirim body respons — hanya header. Karena itu metode yang tercatat adalah
  HEAD, bukan GET.
- **Alasan `http://github.com` dialihkan:** GitHub memaksa seluruh lalu lintas
  memakai HTTPS. Permintaan HTTP polos dibalas `301 Moved Permanently` dengan
  header `Location: https://github.com/`, sehingga klien mengulang permintaan ke
  alamat HTTPS.

## 4. Kendala dan Penyelesaian

- **Port 3000 sudah terpakai.** Saat menjalankan `npm run dev`, port default sudah
  digunakan proses lain sehingga Next.js menawarkan port alternatif (mis. 3001).
  Penyelesaian: menghentikan proses lama dengan `npx kill-port 3000` atau
  `taskkill /PID <pid> /F`, atau memakai port alternatif yang ditawarkan Next.js.
- **Perbedaan Next.js 16 (breaking changes).** Struktur file, konvensi, dan API
  Next.js 16 berbeda dari versi sebelumnya, misalnya pengetikan route yang
  menghasilkan file tipe secara otomatis di `.next/dev/types`. Penyelesaian:
  membaca panduan di `node_modules/next/dist/docs/` dan membiarkan `next dev`
  memperbarui konfigurasi (mis. `tsconfig.json`) secara otomatis.

## 5. Catatan Pemanfaatan AI

| Aspek | Keterangan |
| --- | --- |
| Alat | Command Code (Claude) |
| Perintah utama | "Lanjutkan dokumentasi teknis `modul-01.md`; lengkapi tabel pengamatan HTTP, analisis, kendala, dan catatan pemanfaatan AI" |
| Bagian yang digunakan | Melengkapi kerangka dokumen, mengisi tabel pengamatan lalu lintas HTTP, menyusun analisis, dan merapikan format Markdown |
| Cara memverifikasi | Menjalankan ulang perintah `node -v`, `npm -v`, `git --version`, `git log --oneline --graph`, dan `curl -I`/`curl -v` secara manual lalu membandingkan hasilnya |
