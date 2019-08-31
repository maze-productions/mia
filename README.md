# Interactive Short: Mia

[Website](http://miacortometraje.ga) able to play interactively the short film Mia from a streaming server.

## Components

- Frontend
  - The frontend part is composed from the code inside `web` folder. It's an Angular7 application that interacts with the backend in order to retrieve the correspondent video depending in which interaction the user is.
- Backend
  - Very simple and lightweight Express application able to retrieve a video file, given its name, part by part becoming the backend to a streaming server.

> **Note**: For knowning how which component works in a deeper way, please see the corresponding README of every folder (`web/` or `server/`).

## Requirements

For a better, easier and more comfortable way for running the website, it's needed to install *Docker* and *Docker-compose*.

Docker is an open-source project that automates the deployment of software applications inside containers by providing an additional layer of abstraction and automation. Installing and deploying an application using Docker makes the process easier because you don't need to install all the dependencies such as Node, Angular and more because Docker is taking care of it for you.

Docker-compose makes your Docker containers management easier, as you will see after installing it.

1. **docker**
   1. Windows: https://docs.docker.com/docker-for-windows/install/
   2. Mac: https://docs.docker.com/docker-for-mac/install/
   3. Linux: https://docs.docker.com/install/linux/docker-ce/ubuntu/
2. **docker-compose**
   1. Windows: *Already installed once Docker is installed*.
   2. Mac: *Already installed once Docker is installed*.
   3. Linux: https://github.com/docker/compose/releases

Check if the installation was successful opening a terminal and running the following command:

```bash
docker-compose --version
```

You should see something like:

```bash
docker-compose version 1.23.2, build 1110ad01
```

*Don't you know how to open a terminal in you operating system?*

- Windows: https://www.quora.com/How-do-I-open-terminal-in-windows
- Mac: https://macpaw.com/how-to/use-terminal-on-mac
- Linux: https://www.wikihow.com/Open-a-Terminal-Window-in-Ubuntu

## Usage

To run the whole stack, please execute the following steps:

1. Copy all the video files into `server/assets/` folder. All of them have to be in `.mov` format.

2. Open a terminal and change the directory to this folder (where this README is). Don't you know how to change the directory in your terminal?

    1. Windows: https://stackoverflow.com/questions/17753986/how-to-change-directory-using-windows-command-line
    2. Mac: https://www.macworld.com/article/2042378/master-the-command-line-navigating-files-and-folders.html
    3. Linux: https://www.cyberciti.biz/faq/how-to-change-directory-in-linux-terminal/

3. Once you've been in the correct folder, run the server as a docker container with docker-compose.

    ```bash
    docker-compose up -d
    ```

    If it fails, try to repeat the command adding a `sudo`  at the beginning.

    ```bash
    sudo docker-compose up -d
    ```

    Once it's up and running, which can take a while in the first time, go to `http://localhost:8081/` for being able to watch Mia, the interactive short film.

## License

Apache-2.0 © Maze Productions
