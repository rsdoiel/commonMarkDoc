Installation for development of **commonMarkDoc**
===========================================

**commonMarkDoc** This is a TypeScript module for working with CommonMark documents. It assumes that the runtime environment is Deno 2.4.2 or better.

Quick install with curl or irm
------------------------------

There is an experimental installer.sh script that can be run with the following command to install latest table release. This may work for macOS, Linux and if you’re using Windows with the Unix subsystem. This would be run from your shell (e.g. Terminal on macOS).

~~~shell
curl https://rsdoiel.github.io/commonMarkDoc/installer.sh | sh
~~~

This will install the programs included in commonMarkDoc in your `$HOME/bin` directory.

If you are running Windows 10 or 11 use the Powershell command below.

~~~ps1
irm https://rsdoiel.github.io/commonMarkDoc/installer.ps1 | iex
~~~

### If your are running macOS or Windows

You may get security warnings if you are using macOS or Windows. See the notes for the specific operating system you're using to fix issues.

- [INSTALL_NOTES_macOS.md](INSTALL_NOTES_macOS.md)
- [INSTALL_NOTES_Windows.md](INSTALL_NOTES_Windows.md)

Installing from source
----------------------

### Required software

- Deno &gt;&#x3D; 2.4.2
- CMTools &gt;&#x3D; 0.0.37

### Steps

1. git clone https://github.com/rsdoiel/commonMarkDoc
2. Change directory into the `commonMarkDoc` directory
3. Make to build, test and install

~~~shell
git clone https://github.com/rsdoiel/commonMarkDoc
cd commonMarkDoc
make
make test
make install
~~~

