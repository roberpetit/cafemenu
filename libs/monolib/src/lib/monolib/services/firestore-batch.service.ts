import { Injectable } from "@angular/core";
import { Firestore, writeBatch, doc } from "firebase/firestore";
import { timer } from "rxjs";

interface BatchWrite {
    op: 'set' | 'update' | 'delete' | 'add';
    path: string;
    data?: any;
  }
  
  @Injectable({ providedIn: 'root' })
  export class FirestoreBatchService {
    private queue: BatchWrite[] = [];
    private debounceDelay = 300; // milliseconds
    private scheduled = false;
  
    constructor(private firestore: Firestore) {}
    
    add(path: string, data: any): void {
      this.queue.push({ op: 'add', path, data });
    }

    set(path: string, data: any) {
      this.queue.push({ op: 'set', path, data });
      this.scheduleFlush();
    }
  
    update(path: string, data: any) {
      this.queue.push({ op: 'update', path, data });
      this.scheduleFlush();
    }
  
    delete(path: string) {
      this.queue.push({ op: 'delete', path });
      this.scheduleFlush();
    }
  
    private scheduleFlush() {
      if (!this.scheduled) {
        this.scheduled = true;
        timer(this.debounceDelay).subscribe(() => this.flush());
      }
    }
  
    private async flush() {
      if (this.queue.length === 0) {
        this.scheduled = false;
        return;
      }
  
      const batch = writeBatch(this.firestore);
      for (const write of this.queue) {
        const ref = doc(this.firestore, write.path);
        switch (write.op) {
          case 'add':
          case 'set':
            batch.set(ref, write.data);
            break;
          case 'update':
            batch.update(ref, write.data);
            break;
          case 'delete':
            batch.delete(ref);
            break;
        }
      }
  
      await batch.commit();
      this.queue = [];
      this.scheduled = false;
    }
  }
  