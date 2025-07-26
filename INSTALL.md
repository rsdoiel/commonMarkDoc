Installation for development of **commonMarkDoc**
===========================================

**commonMarkDoc** This is a JavaScript module for working with CommonMark documents. It assumes that the runtime environment is Deno 2.4.2 or better.

Installing from source
----------------------

### Required software

- Deno &gt;&#x3D; 2.4.2
- CMTools &gt;&#x3D; 0.0.36

### Steps

1. git clone https://github.com/rsdoiel/commonMarkDoc
2. Change directory into the `commonMarkDoc` directory
3. Make to build, test and install

~~~shell
git clone https://github.com/rsdoiel/commonMarkDoc
cd commonMarkDoc
deno task test
deno task build
~~~

If you are running macOS or Linux then you can install the `cmarkprocess`
executable with the following command.

~~~shell
mkdir -p $HOME/bin
mv bin/cmarkprocess $HOME/bin
~~~

Make sure `$HOME/bin` is in your path.

On Windows you would do the following

~~~pwsh
mkdir $HOME\bin
copy bin\cmarkprocess.exe $HOME\bin\
~~~

Make sure `$HOME\bin` is in your path.


