import threading
import socket


class Client_api:
    def __init__(self, address, conn, data) -> None:
        self.address = address
        self.conn = conn
        self.data = data


class Server:
    clients = []
    running = True

    def __init__(self) -> None:
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(("0.0.0.0", 4000))
        listen_thread = threading.Thread(target=self.listen_for_connections)
        listen_thread.start()

    def listen_for_connections(self):
        while self.running:
            self.socket.listen()
            conn, addr = self.socket.accept()
            print("received connection with address: " + addr[0])
            self.clients.append(Client_api(addr, conn, ""))

    def handle_connections(self):
        for client in self.clients:
            print("waiting to recv data")
            data = client.conn.recv(1024)
            print("received data:" + str(data))
            client.data += str(data)
            client.conn.sendall(b"lol nice")


server = Server()
while True:
    server.handle_connections()
