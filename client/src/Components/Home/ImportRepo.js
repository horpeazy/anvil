function ImportRepo() {
  return (
    <>
  		<h2 className="import-header">Import repository</h2>
  	 <h3 >Directly work on your GitHub repository in Anvil.<br/>Learn more about Repositories <a href="" target="_blank" rel="noreferrer noopener">here</a>.</h3>
  	<div className="repo-form-wrapper">
    	<form >
      	<input aria-disabled="false" aria-describedby="form-title form-error repo-teams" aria-invalid="false" disabled="" placeholder="GitHub Repository URL" type="text" required="" value="" />
        <button type="submit" disabled="" data-auto-width="true">Import</button>
      </form>
    </div>
  </>
  )
}

export default ImportRepo;
