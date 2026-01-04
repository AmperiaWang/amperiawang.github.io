import time
import numpy as np
from matplotlib import pyplot as plt


class IF:
    def __init__(self, u_rest: float) -> None:
        self.u_rest = u_rest
        self.reset()
    
    def reset(self):
        self.u = self.u_rest
        self.t = -1.0
        self.records = []
    
    def next(self, t: float, s: float):
        if self.t < 0.0:
            dt = 0.0
        else:
            dt = t - self.t
        self.t = t
        du = s * dt
        self.u += du
        self.records.append([t, self.u])


class LIF:
    def __init__(self, tau_m: float, u_rest: float) -> None:
        self.tau_m = tau_m
        self.u_rest = u_rest
        self.reset()
    
    def reset(self):
        self.u = self.u_rest
        self.t = -1.0
        self.records = []
    
    def next(self, t: float, s: float):
        if self.t < 0.0:
            dt = 0.0
        else:
            dt = t - self.t
        self.t = t
        du = (-(self.u - self.u_rest) + s) / self.tau_m * dt
        self.u += du
        self.records.append([t, self.u])


class QIF:
    def __init__(self, tau_m: float, u_rest: float, u_c: float, a_0: float) -> None:
        self.tau_m = tau_m
        self.u_rest = u_rest
        self.u_c = u_c
        self.a_0 = a_0
        self.reset()
    
    def reset(self):
        self.u = self.u_rest
        self.t = -1.0
        self.records = []
    
    def next(self, t: float, s: float):
        if self.t < 0.0:
            dt = 0.0
        else:
            dt = t - self.t
        self.t = t
        du = (self.a_0 * (self.u - self.u_rest) * (self.u - self.u_c) + s) / self.tau_m * dt
        self.u += du
        self.records.append([t, self.u])


if __name__ == "__main__":
    start_time = time.time()
    neuron = QIF(2.0, -0.07, 1.0, 1.0)
    t = start_time
    sim_time = 5.0
    sp_times = [1.0, 3.0]
    sp_ready_num = 0
    while t - start_time < sim_time:
        t = time.time()
        s = 0.0
        for idx, sp in enumerate(sp_times):
            if t - start_time > sp and sp_ready_num <= idx:
                s += 1.0
                sp_ready_num += 1
        neuron.next(t, s)
    plt.figure()
    plt.plot([a[0] - start_time for a in neuron.records], [a[1] for a in neuron.records])
    plt.xlabel("$t/s$")
    plt.ylabel("$V_{m}/V$")
    plt.show()