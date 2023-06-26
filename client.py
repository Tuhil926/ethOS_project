import socket
import threading


class Client:
    server_host = "127.0.0.1"
    server_port = 4000
    server_sock = None
    server_conn = None
    running = True

    def __init__(self) -> None:
        self.server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self):
        self.server_sock.connect((self.server_host, self.server_port))

    def send_data(self):
        while self.running:
            self.server_sock.sendall(b"hello world!!")
            data = self.server_sock.recv(1024)
            print("received data:", data)


client = Client()
client.connect()
print("connected")
client.send_data()
