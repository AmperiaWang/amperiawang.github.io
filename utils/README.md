# 小工具

## switch_cuda.sh

由于饱受cuda环境设置困扰，从网上扒下了这一段代码，写成sh文件放在这里，使用方法为：

（1）将`switch_cuda.sh`放在某个目录下，这里以主目录`~`为例。

（2）使用`vim`开主目录的`.bashrc`文件：

```sh
sudo apt install vim
sudo vim ~/.bashrc
```

（3）按`i`进入编辑模式后，跳到文件末尾，加上这两行（以`cuda`版本为`11.7`为例）：

```sh
source ~/switch_cuda.sh
switch_cuda 11.7
```

之后按`esc`进入命令行模式后输入`:wq`保存并退出。

（4）关闭当前窗口，当再次打开命令行时，`.bashrc`会自动生效。若需要在当前窗口生效，可以输入：

```sh
source ~/.bashrc
```