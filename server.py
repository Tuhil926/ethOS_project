import threading
import socket


inputs = [False, False, False, False]


class Client_api:
    def __init__(self, address, conn, data) -> None:
        self.address = address
        self.conn = conn
        self.data = data
        self.pos = [0, 0]
    
    def make_pos_to_send(self):
        data = b""
        data += str(self.pos[0]).encode() + b" "
        data += str(self.pos[1]).encode() + b" "
        return data

    def parse_inputs(self):
        inps = [int(x) for x in self.data.split()]
        if inps[0]:
            self.pos[1] -= 10
        if inps[1]:
            self.pos[0] -= 10
        if inps[2]:
            self.pos[1] += 10
        if inps[3]:
            self.pos[0] += 10


class Server:
    clients = []
    running = True

    def __init__(self) -> None:
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(("localhost", 4000))
        print(socket.gethostbyname(socket.gethostname()))
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
            # print("waiting to recv data")
            data = client.conn.recv(1024)
            print("received data:" + str(data))
            client.data = str(data)[2:-1]
            client.parse_inputs()

            to_send = client.make_pos_to_send()
            for client2 in self.clients:
                if client2 is not client:
                    to_send += client2.make_pos_to_send()
            client.conn.sendall(to_send)


server = Server()
while True:
    server.handle_connections()

