/**
 * @Author yejiang1015
 * @Date 2020-09-21 11:22:43
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-18 18:08:28
 * @Message AutoRunTask
 * @ serial 串行
 * @ parallel 并行
 */

type RunType = 'serial' | 'parallel';
export type TaskItemType = () => Promise<void>;

export default class AutoRunTask {
  protected TaskQueue: Set<TaskItemType>;
  protected runType: RunType;
  protected delayedTime: number;
  constructor(runType: RunType = 'serial', delayedTime = 1000) {
    this.runType = runType || 'serial';
    this.delayedTime = delayedTime;
    this.TaskQueue = new Set();
    this.services();
  }
  public delayed(time = this.delayedTime) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  protected rejectError(error: Error) {
    console.error(error);
  }

  protected async services() {
    /** console.info('【Note】 AutoTaskRuning') */
    if (this.runType === 'serial') {
      /** @串行 */
      for (const item of this.TaskQueue.values()) {
        // if (!$$.isAsyncFunction(item)) {
        //   this.TaskQueue.delete(item);
        //   continue;
        // }
        try {
          await item();
        } catch (error) {
          this.rejectError(error);
        }
        this.TaskQueue.delete(item);
      }
    } else {
      /** @并行 */
      if (this.TaskQueue.size) {
        const AllPromise: Promise<void>[] = [];
        for (const item of this.TaskQueue.values()) {
          // if (!$$.isAsyncFunction(item)) {
          //   this.TaskQueue.delete(item);
          //   continue;
          // }
          AllPromise.push(item());
          this.TaskQueue.delete(item);
        }
        if (AllPromise.length) {
          try {
            await Promise.all([AllPromise]);
          } catch (error) {
            this.rejectError(error);
          }
        }
      }
    }
    await this.delayed();
    await this.services();
  }

  public insertService(task: TaskItemType[]) {
    let resultBool = false;
    for (const item of task) {
      this.TaskQueue.add(item);
      resultBool = this.TaskQueue.has(item);
    }
    return resultBool;
  }
}
