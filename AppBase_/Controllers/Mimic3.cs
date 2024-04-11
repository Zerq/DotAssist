using System.Diagnostics;
using Microsoft.Extensions.ObjectPool;
using Microsoft.Win32.SafeHandles;

namespace AppBase_.Controllers;

public static class ProccessExtension{
public static Task<bool> WaitForExitAsync(this Process process, TimeSpan timeout)
    {
        ManualResetEvent processWaitObject = new ManualResetEvent(false);
        processWaitObject.SafeWaitHandle = new SafeWaitHandle(process.Handle, false);

        TaskCompletionSource<bool> tcs = new TaskCompletionSource<bool>();

        RegisteredWaitHandle registeredProcessWaitHandle = null;
        registeredProcessWaitHandle = ThreadPool.RegisterWaitForSingleObject(
            processWaitObject,
            delegate(object state, bool timedOut)
            {
                if (!timedOut)
                {
                    registeredProcessWaitHandle.Unregister(null);
                }

                processWaitObject.Dispose();
                tcs.SetResult(!timedOut);
            },
            null /* state */,
            timeout,
            true /* executeOnlyOnce */);

        return tcs.Task;
    }

}


public class Mimic3: IDisposable {
    public void Dispose()
    {
       this.server.Dispose();
    }

    Process server; 
    public void RunServer(){
     this.server = new System.Diagnostics.Process{
                StartInfo = new ProcessStartInfo{
                    FileName = "mimic3-server", 
                    Arguments = $"--cuda --voice en_US/vctk_low",
                    UseShellExecute = false,
                    RedirectStandardOutput = false,
                    CreateNoWindow = true                
                }
            };
            this.server.Start();
    }
    

}